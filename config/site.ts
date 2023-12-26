export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Konservasi Alam Nusantara",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Table",
      href: "/table/ghg-fluxes?page=1&limit=5",
    },
  ],
  navMenuItems: [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Table",
      href: "/table/ghg-fluxes?page=1&limit=5",
    },
  ],
  navMenuTables: [
    {
      label: "GHG Fluxes",
      path: "ghg-fluxes",
      href: "/table/ghg-fluxes?page=1&limit=5",
    },
    {
      label: "Carbon Stocks",
      path: "carbon-stocks",
      href: "/table/carbon-stocks/woody-debris?page=1&limit=5",
    },
    {
      label: "Soil Physical Chemistry",
      path: "soils",
      href: "/table/soils?page=1&limit=5",
    },
    {
      label: "Weather Data",
      path: "weather",
      href: "/table/weather?page=1&limit=5",
    },
  ],
  navTabCarbon: [
    {
      label: "Woody Debris",
      path: "woody-debris",
      href: "/table/carbon-stocks/woody-debris",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
