"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import type { PopupModel, PopupVariant } from "~/sanity/lib/popupTypes";

interface PopupManagerProviderProps {
  children: React.ReactNode;
  popups: PopupModel[];
  productOptions: string[];
}

interface PopupManagerContextValue {
  activePopup: PopupModel | null;
  productOptions: string[];
  closeActivePopup: () => void;
  triggerPopupByType: (type: PopupVariant) => void;
}

const PopupManagerContext = createContext<PopupManagerContextValue | null>(null);

const getSessionStorageKey = (popupId: string) => `liftronic_popup_seen_${popupId}`;

export function PopupManagerProvider({
  children,
  popups,
  productOptions,
}: PopupManagerProviderProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [activePopupId, setActivePopupId] = useState<string | null>(null);
  const [flowCompletedIds, setFlowCompletedIds] = useState<string[]>([]);
  const [sessionCompletedIds, setSessionCompletedIds] = useState<string[]>([]);
  const [manualQueueIds, setManualQueueIds] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);

  const timerRef = useRef<number | null>(null);
  const scheduledPopupIdRef = useRef<string | null>(null);

  const orderedPopups = useMemo(
    () => [...popups].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    [popups],
  );

  const autoPopups = useMemo(
    () =>
      isHomePage
        ? orderedPopups.filter((popup) => popup.triggerMode === "auto")
        : [],
    [orderedPopups, isHomePage],
  );

  const popupById = useMemo(
    () => new Map(orderedPopups.map((popup) => [popup._id, popup])),
    [orderedPopups],
  );

  const activePopup = useMemo(() => {
    if (!activePopupId) return null;
    return popupById.get(activePopupId) ?? null;
  }, [activePopupId, popupById]);

  const clearScheduledTimer = useCallback(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    scheduledPopupIdRef.current = null;
  }, []);

  useEffect(() => {
    const completedInSession: string[] = [];

    for (const popup of orderedPopups) {
      if (!popup.showOncePerSession) continue;
      try {
        if (sessionStorage.getItem(getSessionStorageKey(popup._id)) === "true") {
          completedInSession.push(popup._id);
        }
      } catch {
        break;
      }
    }

    const timeoutId = window.setTimeout(() => {
      setSessionCompletedIds(completedInSession);
      setIsReady(true);
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [orderedPopups]);

  const isBlockedBySequence = useCallback(
    (popup: PopupModel, completedSet: Set<string>) => {
      if (!popup.waitForPrevious) return false;

      const popupOrder = popup.order ?? Number.MAX_SAFE_INTEGER;
      return autoPopups.some((candidate) => {
        const candidateOrder = candidate.order ?? Number.MAX_SAFE_INTEGER;
        if (candidate._id === popup._id) return false;
        if (candidateOrder >= popupOrder) return false;
        return !completedSet.has(candidate._id);
      });
    },
    [autoPopups],
  );

  const closeActivePopup = useCallback(() => {
    if (!activePopup) return;

    setActivePopupId(null);
    setFlowCompletedIds((previous) =>
      previous.includes(activePopup._id)
        ? previous
        : [...previous, activePopup._id],
    );

    if (activePopup.showOncePerSession) {
      try {
        sessionStorage.setItem(getSessionStorageKey(activePopup._id), "true");
      } catch {
        // Ignore browser storage failures
      }
      setSessionCompletedIds((previous) =>
        previous.includes(activePopup._id)
          ? previous
          : [...previous, activePopup._id],
      );
    }
  }, [activePopup]);

  const triggerPopupByType = useCallback(
    (type: PopupVariant) => {
      const popup =
        orderedPopups.find(
          (item) => item.popupType === type && item.triggerMode === "manual",
        ) ?? orderedPopups.find((item) => item.popupType === type);
      if (!popup) return;

      if (
        popup.showOncePerSession &&
        sessionCompletedIds.includes(popup._id)
      ) {
        return;
      }

      if (activePopupId === popup._id) {
        return;
      }

      const completedSet = new Set([...flowCompletedIds, ...sessionCompletedIds]);

      if (activePopupId || timerRef.current || isBlockedBySequence(popup, completedSet)) {
        setManualQueueIds((previous) =>
          previous.includes(popup._id) ? previous : [...previous, popup._id],
        );
        return;
      }

      setActivePopupId(popup._id);
    },
    [
      orderedPopups,
      sessionCompletedIds,
      activePopupId,
      flowCompletedIds,
      isBlockedBySequence,
    ],
  );

  useEffect(() => {
    if (!isReady || activePopupId) {
      return;
    }

    const completedSet = new Set([...flowCompletedIds, ...sessionCompletedIds]);

    const nextManualPopupId = manualQueueIds.find((popupId) => {
      const popup = popupById.get(popupId);
      if (!popup) return false;
      if (popup.showOncePerSession && sessionCompletedIds.includes(popup._id)) {
        return false;
      }
      return !isBlockedBySequence(popup, completedSet);
    });

    if (nextManualPopupId) {
      clearScheduledTimer();
      window.setTimeout(() => {
        setManualQueueIds((previous) =>
          previous.filter((popupId) => popupId !== nextManualPopupId),
        );
        setActivePopupId(nextManualPopupId);
      }, 0);
      return;
    }

    const nextAutoPopup = autoPopups.find((popup) => {
      if (completedSet.has(popup._id)) return false;
      return !isBlockedBySequence(popup, completedSet);
    });

    if (!nextAutoPopup) {
      clearScheduledTimer();
      return;
    }

    const delayMilliseconds = Math.max(0, nextAutoPopup.delaySeconds ?? 0) * 1000;
    if (delayMilliseconds === 0) {
      clearScheduledTimer();
      window.setTimeout(() => {
        setActivePopupId(nextAutoPopup._id);
      }, 0);
      return;
    }

    if (
      timerRef.current &&
      scheduledPopupIdRef.current === nextAutoPopup._id
    ) {
      return;
    }

    clearScheduledTimer();

    scheduledPopupIdRef.current = nextAutoPopup._id;
    timerRef.current = window.setTimeout(() => {
      const scheduledPopupId = scheduledPopupIdRef.current;
      timerRef.current = null;
      scheduledPopupIdRef.current = null;

      if (scheduledPopupId) {
        setActivePopupId(scheduledPopupId);
      }
    }, delayMilliseconds);
  }, [
    isReady,
    activePopupId,
    flowCompletedIds,
    sessionCompletedIds,
    manualQueueIds,
    popupById,
    autoPopups,
    isBlockedBySequence,
    clearScheduledTimer,
  ]);

  useEffect(() => {
    return () => clearScheduledTimer();
  }, [clearScheduledTimer]);

  useEffect(() => {
    if (isHomePage) return;

    clearScheduledTimer();
    const timeoutId = window.setTimeout(() => {
      setActivePopupId((currentId) => {
        if (!currentId) return currentId;
        const currentPopup = popupById.get(currentId);
        if (currentPopup?.triggerMode === "auto") {
          return null;
        }
        return currentId;
      });
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isHomePage, popupById, clearScheduledTimer]);

  const value = useMemo<PopupManagerContextValue>(
    () => ({
      activePopup,
      productOptions,
      closeActivePopup,
      triggerPopupByType,
    }),
    [activePopup, productOptions, closeActivePopup, triggerPopupByType],
  );

  return (
    <PopupManagerContext.Provider value={value}>
      {children}
    </PopupManagerContext.Provider>
  );
}

export function usePopupManager(): PopupManagerContextValue {
  const context = useContext(PopupManagerContext);
  if (!context) {
    throw new Error("usePopupManager must be used inside <PopupManagerProvider>");
  }
  return context;
}

export function useOptionalPopupManager(): PopupManagerContextValue | null {
  return useContext(PopupManagerContext);
}
