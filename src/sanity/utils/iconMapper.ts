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
  FiHome,
  FiVolumeX,
  FiUsers,
  FiTarget,
  FiTruck,
  FiAlertTriangle,
  FiHeart,
  FiAlertCircle,
  FiPackage,
  FiMinimize2,
  FiMaximize2,
  FiAward,
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
  // Product Feature Icons - mapped from emojis
  fiHome: FiHome, // 🏠 -> Home/Space Efficient
  fiVolumeX: FiVolumeX, // 🔇 -> Quiet Operation
  fiShieldCheck: FiShield, // 🛡️ -> Safety (reusing existing)
  fiSparkles: FiAward, // ✨ -> Custom/Premium (using Award as alternative)
  fiUsers: FiUsers, // 👥 -> High Traffic/People
  fiZapElectric: FiZap, // ⚡ -> Energy Efficient (reusing existing)
  fiBrain: FiCpu, // 🧠 -> Smart Controls (using CPU as alternative)
  fiTarget: FiTarget, // 🎯 -> Premium/Precision
  fiTruck: FiTruck, // 🏗️ -> Construction/Heavy Duty
  fiWrench: FiTool, // 🛠️ -> Maintenance/Tools (using Tool as alternative)
  fiDoor: FiMaximize2, // 🚪 -> Access/Doors (using Maximize as alternative)
  fiAlertTriangle: FiAlertTriangle, // ⚠️ -> Safety Warning
  fiHeart: FiHeart, // 🏥 -> Hospital/Healthcare
  fiBed: FiMinimize2, // 🛌 -> Patient/Comfort (using Minimize as alternative)
  fiDroplet: FiActivity, // 🧼 -> Hygiene/Clean (using Activity as alternative)
  fiAlertCircle: FiAlertCircle, // 🚨 -> Emergency/Alert
  fiPackage: FiPackage, // 📦 -> Cargo/Freight
  fiLeaf: FiGlobe, // 🌿 -> Eco-friendly/Green (using Globe as alternative)
  fiSpeaker: FiSettings, // 🔉 -> Sound/Audio (using Settings as alternative)
  fiToolbox: FiTool, // 🔧 -> Tools/Maintenance (reusing existing)
};

// Utility to get icon safely
export const getIcon = (iconName: string): IconType | null => {
  return iconMap[iconName] || null;
};
