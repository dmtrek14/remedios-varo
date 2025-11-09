export const profile = {
  fullName: "Remedios Varo",
  title: "",
  institute: "",
  author_name: "", // Author name to be highlighted in the papers section
  research_areas: [
    // { title: 'Physics', description: 'Brief description of the research interest', field: 'physics' },
  ],
};

// Set equal to an empty string to hide the icon that you don't want to display
export const social = {};

export const template = {
  website_url: "https://localhost:4321", // Astro needs to know your site’s deployed URL to generate a sitemap. It must start with http:// or https://
  menu_left: false,
  transitions: true,
  lightTheme: "stillLife", // Select one of the Daisy UI Themes or create your own
  darkTheme: "varo", // Select one of the Daisy UI Themes or create your own
  excerptLength: 200,
  postPerPage: 5,
  base: "", // Repository name starting with /
};

export const seo = {
  default_title: "Remedios Varo",
  default_description: "One of the three witches of surrealism.",
  default_image: "/images/profile_pictures.jpg",
};
