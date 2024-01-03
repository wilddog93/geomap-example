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
      href: "/table/ghg-fluxes?page=1&limit=10",
    },
    {
      label: "Carbon Stocks",
      path: "carbon-stocks",
      href: "/table/carbon-stocks/woody-debris?page=1&limit=10",
    },
    {
      label: "Soil Physical Chemistry",
      path: "soils",
      href: "/table/soils/physical?page=1&limit=10",
    },
    {
      label: "Weather Data",
      path: "weather",
      href: "/table/weather?page=1&limit=10",
    },
  ],
  navTabCarbon: [
    {
      label: "Woody Debris",
      path: "woody-debris",
      href: "/table/carbon-stocks/woody-debris",
    },
    {
      label: "Litters",
      path: "litters",
      href: "/table/carbon-stocks/litters",
    },
    {
      label: "Soils",
      path: "carbon-soils",
      href: "/table/carbon-stocks/carbon-soils",
    },
    {
      label: "Trees",
      path: "trees",
      href: "/table/carbon-stocks/trees",
    },
  ],
  navTabSoils: [
    {
      label: "Physical",
      path: "physical",
      href: "/table/soils/physical",
    },
    {
      label: "Chamber 1",
      path: "chamber-1",
      href: "/table/soils/chamber-1",
    },
    {
      label: "Chamber 2",
      path: "chamber-2",
      href: "/table/soils/chamber-2",
    },
    {
      label: "Chamber 3",
      path: "chamber-3",
      href: "/table/soils/chamber-3",
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
