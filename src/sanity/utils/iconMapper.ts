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
  FiClock,
  FiPhone,
  FiMail,
  FiMapPin,
  FiArrowRight,
  FiArrowLeft,
  FiArrowUp,
  FiArrowDown,
  FiChevronRight,
  FiChevronLeft,
  FiChevronUp,
  FiChevronDown,
  FiCheck,
  FiX,
  FiMenu,
  FiSearch,
  FiDownload,
  FiUpload,
  FiEdit,
  FiTrash,
  FiEye,
  FiEyeOff,
  FiImage,
  FiVideo,
  FiFile,
  FiFileText,
  FiFolder,
  FiCalendar,
  FiBookmark,
  FiShare2,
  FiMessageCircle,
  FiBell,
  FiRefreshCw,
  FiBarChart,
  FiPieChart,
  FiLayers,
  FiBox,
  FiGrid,
  FiSliders,
  FiFilter,
  FiCode,
  FiDatabase,
  FiServer,
  FiCloud,
  FiWifi,
  FiBluetooth,
  FiBattery,
  FiPower,
  FiSun,
  FiMoon,
  FiCreditCard,
  FiShoppingCart,
  FiShoppingBag,
  FiTag,
  FiDollarSign,
  FiPercent,
  FiNavigation,
  FiCompass,
  FiMap,
  FiAnchor,
  FiFeather,
  FiSend,
  FiInfo,
  FiHelpCircle,
} from "react-icons/fi";
import {
  HiChevronRight,
  HiHome,
  HiX,
  HiChevronLeft,
  HiPlay,
  HiPhotograph,
  HiEye,
  HiArrowRight,
} from "react-icons/hi";
import {
  BiShield,
  BiCog,
  BiStar,
  BiSupport,
  BiCheckCircle,
  BiGlobe,
  BiWrench,
  BiRocket,
  BiTrendingUp,
  BiHeart,
  BiUser,
} from "react-icons/bi";
import { IoChevronDown } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import { IconType } from "react-icons";

// You can keep adding here as your Sanity grows
const iconMap: Record<string, IconType> = {
  // Social icons
  fiInstagram: FiInstagram, // 📷
  fiFacebook: FiFacebook, // 👍
  fiTwitter: FiTwitter, // 🐦
  fiLinkedin: FiLinkedin, // 💼
  fiYoutube: FiYoutube, // ▶️

  // Feature icons
  fiShield: FiShield, // 🛡️
  fiSettings: FiSettings, // ⚙️
  fiZap: FiZap, // ⚡
  fiTool: FiTool, // 🔧
  fiCheckCircle: FiCheckCircle, // ✅
  fiCpu: FiCpu, // 🖥️
  fiTrendingUp: FiTrendingUp, // 📈
  fiLock: FiLock, // 🔒
  fiStar: FiStar, // ⭐
  fiGlobe: FiGlobe, // 🌐
  fiActivity: FiActivity, // 📊
  fiThumbsUp: FiThumbsUp, // 👍
  fiAward: FiAward, // 🏆

  // Product/Service icons
  fiHome: FiHome, // 🏠
  fiVolumeX: FiVolumeX, // 🔇
  fiUsers: FiUsers, // 👥
  fiTarget: FiTarget, // 🎯
  fiTruck: FiTruck, // 🚚
  fiAlertTriangle: FiAlertTriangle, // ⚠️
  fiHeart: FiHeart, // ❤️
  fiAlertCircle: FiAlertCircle, // 🚨
  fiPackage: FiPackage, // 📦
  fiMinimize2: FiMinimize2, // ⬇️
  fiMaximize2: FiMaximize2, // ⬆️

  // Time & Contact
  fiClock: FiClock, // 🕐
  fiPhone: FiPhone, // 📞
  fiMail: FiMail, // ✉️
  fiMapPin: FiMapPin, // 📍
  fiCalendar: FiCalendar, // 📅

  // Navigation
  fiArrowRight: FiArrowRight, // →
  fiArrowLeft: FiArrowLeft, // ←
  fiArrowUp: FiArrowUp, // ↑
  fiArrowDown: FiArrowDown, // ↓
  fiChevronRight: FiChevronRight, // ›
  fiChevronLeft: FiChevronLeft, // ‹
  fiChevronUp: FiChevronUp, // ˄
  fiChevronDown: FiChevronDown, // ˅
  fiNavigation: FiNavigation, // 🧭
  fiCompass: FiCompass, // 🧭
  fiMap: FiMap, // 🗺️

  // UI Actions
  fiCheck: FiCheck, // ✓
  fiX: FiX, // ✕
  fiMenu: FiMenu, // ☰
  fiSearch: FiSearch, // 🔍
  fiDownload: FiDownload, // ⬇️
  fiUpload: FiUpload, // ⬆️
  fiEdit: FiEdit, // ✏️
  fiTrash: FiTrash, // 🗑️
  fiEye: FiEye, // 👁️
  fiEyeOff: FiEyeOff, // 👁️‍🗨️
  fiRefreshCw: FiRefreshCw, // 🔄
  fiSliders: FiSliders, // 🎚️
  fiFilter: FiFilter, // 🔽

  // Media & Content
  fiImage: FiImage, // 🖼️
  fiVideo: FiVideo, // 🎥
  fiFile: FiFile, // 📄
  fiFileText: FiFileText, // 📝
  fiFolder: FiFolder, // 📁
  fiBookmark: FiBookmark, // 🔖
  fiShare2: FiShare2, // 📤
  fiMessageCircle: FiMessageCircle, // 💬
  fiBell: FiBell, // 🔔
  fiSend: FiSend, // ✈️

  // Data & Analytics
  fiBarChart: FiBarChart, // 📊
  fiPieChart: FiPieChart, // 📊
  fiLayers: FiLayers, // 🗂️
  fiBox: FiBox, // 📦
  fiGrid: FiGrid, // ▦
  fiCode: FiCode, // 💻
  fiDatabase: FiDatabase, // 💾
  fiServer: FiServer, // 🖥️

  // Tech & Connectivity
  fiCloud: FiCloud, // ☁️
  fiWifi: FiWifi, // 📶
  fiBluetooth: FiBluetooth, // 📡
  fiBattery: FiBattery, // 🔋
  fiPower: FiPower, // ⚡

  // UI Themes
  fiSun: FiSun, // ☀️
  fiMoon: FiMoon, // 🌙

  // Commerce
  fiCreditCard: FiCreditCard, // 💳
  fiShoppingCart: FiShoppingCart, // 🛒
  fiShoppingBag: FiShoppingBag, // 🛍️
  fiTag: FiTag, // 🏷️
  fiDollarSign: FiDollarSign, // 💲
  fiPercent: FiPercent, // %

  // Misc
  fiAnchor: FiAnchor, // ⚓
  fiFeather: FiFeather, // 🪶
  fiInfo: FiInfo, // ℹ️
  fiHelpCircle: FiHelpCircle, // ❓

  // HeroIcons (Hi prefix)
  hiChevronRight: HiChevronRight, // ›
  hiHome: HiHome, // 🏠
  hiX: HiX, // ✕
  hiChevronLeft: HiChevronLeft, // ‹
  hiPlay: HiPlay, // ▶️
  hiPhotograph: HiPhotograph, // 📷
  hiEye: HiEye, // 👁️
  hiArrowRight: HiArrowRight, // →

  // BoxIcons (Bi prefix)
  biShield: BiShield, // 🛡️
  biCog: BiCog, // ⚙️
  biStar: BiStar, // ⭐
  biSupport: BiSupport, // 🎧
  biCheckCircle: BiCheckCircle, // ✅
  biGlobe: BiGlobe, // 🌐
  biWrench: BiWrench, // 🔧
  biRocket: BiRocket, // 🚀
  biTrendingUp: BiTrendingUp, // 📈
  biHeart: BiHeart, // ❤️
  biUser: BiUser, // 👤

  // Ionicons (Io prefix)
  ioChevronDown: IoChevronDown, // ˅

  // FontAwesome (Fa prefix)
  faWhatsapp: FaWhatsapp, // 💬

  // Aliases for backend compatibility (lowercase names)
  star: BiStar,
  shield: BiShield,
  support: BiSupport,
  cog: BiCog,
  check: BiCheckCircle,
  globe: BiGlobe,
  wrench: BiWrench,
  rocket: BiRocket,
  trending: BiTrendingUp,
  heart: BiHeart,
  user: BiUser,
};

// Utility to get icon safely
export const getIcon = (iconName: string): IconType | null => {
  return iconMap[iconName] || null;
};
