export interface TeaserPopup {
  _id: string;
  title?: string;
  description?: string;
  videoUrl: string;
  delaySeconds: number;
  isEnabled: boolean;
  showOncePerSession: boolean;
}
