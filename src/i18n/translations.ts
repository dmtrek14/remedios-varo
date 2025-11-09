export const translations = {
  en: {
    nav: {
      home: "Home",
      // research: "Research",
      // papers: "Papers",
      // blog: "Blog",
      // cv: "CV",
      life: "Life",
      work: "Work",
    },
    home: {
      researchAreas: "Research Areas",
      recentPublications: "Recent Publications",
    },
    // research: {
    //   title: "Research",
    //   overview: "Research Overview",
    // },
    // papers: {
    //   title: "Papers",
    //   publications: "Publications",
    // },
    // blog: {
    //   title: "Blog",
    //   readMore: "Read more",
    //   publishedOn: "Published on",
    // },
    // cv: {
    //   title: "Curriculum Vitae",
    //   education: "Education",
    //   experience: "Experience",
    //   publications: "Publications",
    //   awards: "Awards",
    // },
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
      research: "Investigación",
      papers: "Artículos",
      blog: "Blog",
      cv: "CV",
      life: "Vida",
      work: "Obra",
    },
    home: {
      researchAreas: "Áreas de Investigación",
      recentPublications: "Publicaciones Recientes",
    },
    // research: {
    //   title: "Investigación",
    //   overview: "Resumen de Investigación",
    // },
    // papers: {
    //   title: "Artículos",
    //   publications: "Publicaciones",
    // },
    // blog: {
    //   title: "Blog",
    //   readMore: "Leer más",
    //   publishedOn: "Publicado el",
    // },
    // cv: {
    //   title: "Currículum Vitae",
    //   education: "Educación",
    //   experience: "Experiencia",
    //   publications: "Publicaciones",
    //   awards: "Premios",
    // },
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
