import { Fira_Code as FontMono, Inter as FontSans, DM_Sans} from "next/font/google"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--dm-sans"
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})
