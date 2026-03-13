export type PopupVariant = "teaser" | "requestQuote";
export type PopupTriggerMode = "auto" | "manual";

export interface TeaserPopupConfig {
  title?: string;
  description?: string;
  videoUrl: string;
}

export interface RequestQuotePopupConfig {
  title: string;
  subtitle?: string;
}

export interface PopupModel {
  _id: string;
  name: string;
  popupType: PopupVariant;
  triggerMode: PopupTriggerMode;
  order: number;
  isActive: boolean;
  delaySeconds?: number;
  showOncePerSession?: boolean;
  waitForPrevious?: boolean;
  teaserConfig?: TeaserPopupConfig;
  requestQuoteConfig?: RequestQuotePopupConfig;
}
