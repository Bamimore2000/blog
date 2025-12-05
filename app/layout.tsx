import { Fredoka, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/nav-bar";

const fredoka = Fredoka({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const jetMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${fredoka.variable} dark ${jetMono.variable} antialiased`}>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
