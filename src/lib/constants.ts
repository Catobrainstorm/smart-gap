export const APP_NAME = "SmartGap";
export const APP_DEFAULT_TITLE = "SmartGap — 4-Week Learning Journey";
export const APP_TITLE_TEMPLATE = "%s | SmartGap";
export const APP_DESCRIPTION =
  "A gamified 4-week learning platform that bridges insight and action — installable, offline-ready, and personalized to your ikigai.";

export const COLOR_MODE_STORAGE_KEY = "smartgap-color-mode";
export const LAYOUT_THEME_STORAGE_KEY = "smartgap-layout-theme";

export const LAYOUT_THEMES = [
  { id: "classic" as const, label: "Classic", description: "Apple-inspired elegance" },
  { id: "cyber" as const, label: "Cyber", description: "Neon-futuristic edge" },
  { id: "minimalist" as const, label: "Minimalist", description: "Clean & focused" },
] as const;

export const DASHBOARD_NAV = [
  { label: "Modules", href: "/modules", description: "4-week curriculum" },
  { label: "Ikigai", href: "/ikigai", description: "Psychometric insights" },
] as const;
