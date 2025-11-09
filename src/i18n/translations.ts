export const translations = {
  en: {
    nav: {
      home: "Home",
      life: "Life",
      work: "Work",
      facts: "Interesting facts",
      references: "References and more info",
    },
    home: {
      researchAreas: "Research Areas",
      recentPublications: "Recent Publications",
    },
    common: {
      loading: "Loading...",
      error: "Error",
      notFound: "Not Found",
      backToHome: "Back to Home",
    },
  },
  es: {
    nav: {
      home: "Inicio",
      life: "Vida",
      work: "Obra",
      facts: "Realidades interesantes",
      references: "Referencias y más información",
    },
    home: {
      researchAreas: "Áreas de Investigación",
      recentPublications: "Publicaciones Recientes",
    },
    common: {
      loading: "Cargando...",
      error: "Error",
      notFound: "No Encontrado",
      backToHome: "Volver al Inicio",
    },
  },
} as const;

export type Locale = keyof typeof translations;

export function useTranslations(locale: Locale) {
  return function t(key: string) {
    const keys = key.split(".");
    let value: any = translations[locale];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };
}
