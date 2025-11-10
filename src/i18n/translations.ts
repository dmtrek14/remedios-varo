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
    cv: {
      lifeEventsTitle: "Life Events",
      photoGallery: "Photo Gallery",
      experiences: [],
      education: [],
      skills: [],
      publications: [],
      lifeEvents: [
        {
          title: "Birth",
          description: "",
          time: "December 16, 1908",
          link: "",
          location: "Anglés, Girona, Spain",
        },
        {
          title: "Real Academia de Bellas Artes de San Fernando",
          description: "",
          time: "1924-1930",
          link: "",
          location: "Madrid, Spain",
        },
        {
          title: "Married Gerardo Lizárraga",
          description: "",
          time: "1930",
          link: "",
          location: "San Sebastián, Spain",
        },
        {
          title: "Moved to Paris",
          description: "Because of increasing violence in Madrid",
          time: "1931-32",
          link: "",
          location: "Paris, France",
        },
        {
          title: "Moved to Barcelona",
          description: "",
          time: "1932",
          link: "",
          location: "Barcelona, Spain",
        },
        {
          title: "Moved to France",
          description:
            "Went with lover Benjamin Péret, leaving her husband in Spain",
          time: "1937",
          link: "",
          location: "Paris, France",
        },
        {
          title: "Imprisoned",
          description: "Length and exact location unknown",
          time: "1940",
          link: "",
          location: "France",
        },
        {
          title: "Fled to the south of France",
          description: "Due to Nazi invasion of Paris",
          time: "June, 1940",
          link: "",
          location: "France",
        },
        {
          title: "Fled to Mexico",
          description: "",
          time: "1941",
          link: "",
          location: "Mexico City, Mexico",
        },
        {
          title: "Illustrator for scientific expedition in Venezuela",
          description:
            "Her brother was chief of epidemiology for the ministry of public health and arranged a job for her in the malaria control division",
          time: "Late 1947-49",
          link: "",
          location: "Venezuela",
        },
        {
          title: "Marries Walter Gruen",
          description:
            "She also officially abandoned her commercial work to focus on her art",
          time: "1952",
          link: "",
          location: "Mexico City, Mexico",
        },
        {
          title: "First Mexican exhibition (group show)",
          description: "",
          time: "1955",
          link: "",
          location: "Mexico City, Mexico",
        },
        {
          title: "Death",
          description: "Heart attack",
          time: "October 8, 1963",
          link: "",
          location: "Mexico City, Mexico",
        },
      ],
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
    cv: {
      lifeEventsTitle: "Eventos de Vida",
      photoGallery: "Galería de Fotos",
      experiences: [],
      education: [],
      skills: [],
      publications: [],
      lifeEvents: [
        {
          title: "Nacimiento",
          description: "",
          time: "16 de diciembre de 1908",
          link: "",
          location: "Anglés, Gerona, España",
        },
        {
          title: "Real Academia de Bellas Artes de San Fernando",
          description: "",
          time: "1924-1930",
          link: "",
          location: "Madrid, España",
        },
        {
          title: "Se casó con Gerardo Lizárraga",
          description: "",
          time: "1930",
          link: "",
          location: "San Sebastián, España",
        },
        {
          title: "Se mudó a París",
          description: "Debido al aumento de la violencia en Madrid",
          time: "1931-32",
          link: "",
          location: "París, Francia",
        },
        {
          title: "Se mudó a Barcelona",
          description: "",
          time: "1932",
          link: "",
          location: "Barcelona, España",
        },
        {
          title: "Se mudó a Francia",
          description:
            "Fue con su amante Benjamin Péret, dejando a su esposo en España",
          time: "1937",
          link: "",
          location: "París, Francia",
        },
        {
          title: "Encarcelada",
          description: "Duración y ubicación exacta desconocidas",
          time: "1940",
          link: "",
          location: "Francia",
        },
        {
          title: "Huyó al sur de Francia",
          description: "Debido a la invasión nazi de París",
          time: "Junio de 1940",
          link: "",
          location: "Francia",
        },
        {
          title: "Huyó a México",
          description: "",
          time: "1941",
          link: "",
          location: "Ciudad de México, México",
        },
        {
          title: "Ilustradora para expedición científica en Venezuela",
          description:
            "Su hermano era jefe de epidemiología del ministerio de salud pública y le consiguió un trabajo en la división de control de la malaria",
          time: "Finales de 1947-49",
          link: "",
          location: "Venezuela",
        },
        {
          title: "Se casa con Walter Gruen",
          description:
            "También abandonó oficialmente su trabajo comercial para concentrarse en su arte",
          time: "1952",
          link: "",
          location: "Ciudad de México, México",
        },
        {
          title: "Primera exposición mexicana (exposición colectiva)",
          description: "",
          time: "1955",
          link: "",
          location: "Ciudad de México, México",
        },
        {
          title: "Muerte",
          description: "Ataque al corazón",
          time: "8 de octubre de 1963",
          link: "",
          location: "Ciudad de México, México",
        },
      ],
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

// Helper function to get CV data in the specified locale
export function getCvTranslations(locale: Locale) {
  return translations[locale].cv;
}
