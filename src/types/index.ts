export type NavLink = {
  label: string;
  href: string;
};

export type Feature = {
  title: string;
  description: string;
  icon: "device" | "offline" | "speed" | "shield";
};

export type Step = {
  step: string;
  title: string;
  description: string;
};

export type ColorMode = "light" | "dark";

export type LayoutTheme = "classic" | "cyber" | "minimalist";

export type AuthMode = "login" | "register";
