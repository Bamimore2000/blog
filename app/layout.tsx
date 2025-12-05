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

export const metadata = {
  title: "Statecraft – Understanding how states are made and unmade",
  description:
    "Statecraft explores the political economy of conflict, insurgency, and state-building in sub-Saharan Africa.",
  keywords: [
    "Statecraft",
    "Political Science",
    "Conflict",
    "Sub-Saharan Africa",
    "Governance",
    "Insurgency",
    "Research",
  ],
  authors: [{ name: "Bamimore Sogo" }],
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    type: "website",
    url: "https://yourdomain.com",
    title: "Statecraft – Understanding how states are made and unmade",
    description:
      "Statecraft explores the political economy of conflict, insurgency, and state-building in sub-Saharan Africa.",
    siteName: "Statecraft",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Early inline script to prevent flicker */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${fredoka.variable} ${jetMono.variable} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

