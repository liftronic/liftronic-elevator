// src/sanity/utils/iconMapper.ts
import {
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiTwitter,
  FiYoutube,
} from "react-icons/fi";
import { IconType } from "react-icons";

// You can keep adding here as your Sanity grows
const iconMap: Record<string, IconType> = {
  fiInstagram: FiInstagram,
  fiFacebook: FiFacebook,
  fiTwitter: FiTwitter,
  fiLinkedin: FiLinkedin,
  fiYoutube: FiYoutube,
};

// Utility to get icon safely
export const getIcon = (iconName: string): IconType | null => {
  return iconMap[iconName] || null;
};
