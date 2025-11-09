/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      // "light",
      // {
      //   retro: {
      //     "color-scheme": "light",
      //     "base-100": "oklch(91.637% 0.034 90.515)",
      //     "base-200": "oklch(88.272% 0.049 91.774)",
      //     "base-300": "oklch(84.133% 0.065 90.856)",
      //     "base-content": "oklch(28% 0.066 53.813)",
      //     primary: "oklch(80% 0.114 19.571)",
      //     "primary-content": "oklch(39% 0.141 25.723)",
      //     secondary: "oklch(50% 0.118 165.612)",
      //     "secondary-content": "oklch(90% 0.093 164.15)",
      //     accent: "oklch(68% 0.162 75.834)",
      //     "accent-content": "oklch(41% 0.112 45.904)",
      //     neutral: "oklch(44% 0.011 73.639)",
      //     "neutral-content": "oklch(86% 0.005 56.366)",
      //     info: "oklch(58% 0.158 241.966)",
      //     "info-content": "oklch(96% 0.059 95.617)",
      //     success: "oklch(51% 0.096 186.391)",
      //     "success-content": "oklch(96% 0.059 95.617)",
      //     warning: "oklch(64% 0.222 41.116)",
      //     "warning-content": "oklch(96% 0.059 95.617)",
      //     error: "oklch(70% 0.191 22.216)",
      //     "error-content": "oklch(40% 0.123 38.172)",
      //     "--rounded-box": "0.5rem",
      //     "--rounded-btn": "0.25rem",
      //     "--rounded-badge": "0.25rem",
      //     "--border-btn": "1px",
      //   },
      // },
      // {
      //   psychoanalyst: {
      //     "color-scheme": "light",
      //     primary: "#B94F25", // Rust - bold primary action color
      //     "primary-content": "#F4C679", // Sunset - light text on primary
      //     secondary: "#756B2D", // Field drab - olive secondary
      //     "secondary-content": "#F4C679", // Sunset
      //     accent: "#F6A15C", // Sandy brown - warm accent
      //     "accent-content": "#51230D", // Seal brown - dark text
      //     neutral: "#6E6E6C", // Dim gray
      //     "neutral-content": "#F4C679", // Sunset
      //     "base-100": "#F4C679", // Sunset - lightest for main background
      //     "base-200": "#F6A15C", // Sandy brown - slightly darker
      //     "base-300": "#7D6338", // Coyote - darker still
      //     "base-content": "#51230D", // Seal brown - darkest for text
      //     info: "#756B2D", // Field drab
      //     "info-content": "#F4C679", // Sunset
      //     success: "#7D6338", // Coyote - earthy success
      //     "success-content": "#F4C679", // Sunset
      //     warning: "#F6A15C", // Sandy brown - warm warning
      //     "warning-content": "#51230D", // Seal brown
      //     error: "#B94F25", // Rust - red-toned error
      //     "error-content": "#F4C679", // Sunset
      //     "--rounded-box": "0.5rem",
      //     "--rounded-btn": "0.25rem",
      //     "--rounded-badge": "0.25rem",
      //     "--border-btn": "1px",
      //   },
      // },
      {
        stillLife: {
          "color-scheme": "light",
          primary: "#A01626", // Madder - deep crimson red
          "primary-content": "#F5E3A5", // Vanilla - light text
          secondary: "#DC904D", // Persian orange - warm orange
          "secondary-content": "#3D1726", // Dark purple - dark text
          accent: "#E8BC7C", // Earth yellow - golden accent
          "accent-content": "#4D2B29", // Caput mortuum - dark text
          neutral: "#A99898", // Rose quartz - muted neutral
          "neutral-content": "#3D1726", // Dark purple
          "base-100": "#F5E3A5", // Vanilla - lightest background
          "base-200": "#E8BC7C", // Earth yellow - slightly darker
          "base-300": "#A99898", // Rose quartz - medium
          "base-content": "#3D1726", // Dark purple - darkest text
          info: "#DC904D", // Persian orange
          "info-content": "#4D2B29", // Caput mortuum
          success: "#744D49", // Rose ebony 2 - earthy brown
          "success-content": "#F5E3A5", // Vanilla
          warning: "#E8BC7C", // Earth yellow
          "warning-content": "#4D2B29", // Caput mortuum
          error: "#A01626", // Madder - red error
          "error-content": "#F5E3A5", // Vanilla
          "--rounded-box": "0.5rem",
          "--rounded-btn": "0.25rem",
          "--rounded-badge": "0.25rem",
          "--border-btn": "1px",
        },
      },
      {
        varo: {
          "color-scheme": "dark",
          primary: "#8D6D56", // Raw umber
          "primary-content": "#C9B997", // Khaki (light text on primary)
          secondary: "#A08C7A", // Beaver
          "secondary-content": "#3F3A3B", // Jet (dark text on secondary)
          accent: "#C9B997", // Khaki
          "accent-content": "#3F3A3B", // Jet
          neutral: "#473B3A", // Van Dyke
          "neutral-content": "#C9B997", // Khaki
          "base-100": "#3F3A3B", // Jet - darkest for main background
          "base-200": "#4D484B", // Davy's gray
          "base-300": "#473B3A", // Van Dyke
          "base-content": "#C9B997", // Khaki - light text on dark bg
          info: "#A08C7A", // Beaver
          "info-content": "#3F3A3B", // Jet
          success: "#8D6D56", // Raw umber
          "success-content": "#C9B997", // Khaki
          warning: "#C9B997", // Khaki
          "warning-content": "#3F3A3B", // Jet
          error: "#8D6D56", // Raw umber (reddish tone)
          "error-content": "#C9B997", // Khaki
          "--rounded-box": "0.5rem",
          "--rounded-btn": "0.25rem",
          "--rounded-badge": "0.25rem",
          "--border-btn": "1px",
        },
      },
    ],
  },
  lightMode: ["selector", '[data-theme="stillLife"]'],
  darkMode: ["selector", '[data-theme="varo"]'],
};
