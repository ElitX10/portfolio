import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PROFILE } from "@/lib/data/profile";

import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${PROFILE.name} — ${PROFILE.title}`,
  // TODO: ajuster une fois la tagline et la bio finalisées.
  description: `Portfolio de ${PROFILE.name}, ${PROFILE.title.toLowerCase()} basé à ${PROFILE.location}.`,
  // TODO: URL de déploiement final (utilisée pour les balises OpenGraph absolues).
  metadataBase: new URL("https://portfolio.example.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <TooltipProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
