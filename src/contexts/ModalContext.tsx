"use client";
import { createContext, useContext, useState, useCallback } from "react";

interface ModalContextType {
  isAnyModalOpen: boolean;
  isUserTyping: boolean;
  setModalOpen: (isOpen: boolean) => void;
  setUserTyping: (isTyping: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isAnyModalOpen, setIsAnyModalOpen] = useState(false);
  const [isUserTyping, setIsUserTyping] = useState(false);

  const setModalOpen = useCallback((isOpen: boolean) => {
    setIsAnyModalOpen(isOpen);
  }, []);

  const setUserTyping = useCallback((isTyping: boolean) => {
    setIsUserTyping(isTyping);
  }, []);

  return (
    <ModalContext.Provider
      value={{ isAnyModalOpen, isUserTyping, setModalOpen, setUserTyping }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
