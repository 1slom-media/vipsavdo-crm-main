import type { Ni18nOptions } from "ni18n";

export const ni18nConfig: Ni18nOptions = {
  supportedLngs: ["uz", "ru", "en"],
  fallbackLng: ["uz", "ru", "en"],
  ns: ["translation"],
  react: {
    useSuspense: false,
  },
};
