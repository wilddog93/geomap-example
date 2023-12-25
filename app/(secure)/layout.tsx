import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { dmSans, fontSans } from "@/config/fonts";
import { Providers } from "../providers";
import { Navbar } from "@/components/navbar";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import { useAuth } from "@/stores/auth";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/image/logo.png",
    shortcut: "/image/logo.png",
    apple: "/image/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          dmSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <ToastContainer position="top-right" limit={500} />
          <div className="relative h-screen flex flex-col">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
