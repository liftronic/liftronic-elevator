// src/sanity/utils/iconMapper.ts
import {
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiTwitter,
  FiYoutube,
  FiShield,
  FiSettings,
  FiZap,
  FiTool,
  FiCheckCircle,
  FiCpu,
  FiTrendingUp,
  FiLock,
  FiStar,
  FiGlobe,
  FiActivity,
  FiThumbsUp,
} from "react-icons/fi";
import { IconType } from "react-icons";

// You can keep adding here as your Sanity grows
const iconMap: Record<string, IconType> = {
  // Social icons
  fiInstagram: FiInstagram,
  fiFacebook: FiFacebook,
  fiTwitter: FiTwitter,
  fiLinkedin: FiLinkedin,
  fiYoutube: FiYoutube,
  // Feature icons
  fiShield: FiShield,
  fiSettings: FiSettings,
  fiZap: FiZap,
  fiTool: FiTool,
  fiCheckCircle: FiCheckCircle,
  fiCpu: FiCpu,
  fiTrendingUp: FiTrendingUp,
  fiLock: FiLock,
  fiStar: FiStar,
  fiGlobe: FiGlobe,
  fiActivity: FiActivity,
  fiThumbsUp: FiThumbsUp,
};

// Utility to get icon safely
export const getIcon = (iconName: string): IconType | null => {
  return iconMap[iconName] || null;
};
