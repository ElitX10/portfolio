import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PROFILE } from "@/lib/data/profile";
import { SITE_URL } from "@/lib/site-config";

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

const SITE_TITLE = `${PROFILE.name} — ${PROFILE.title}`;
const SITE_DESCRIPTION = `Portfolio de ${PROFILE.name}, ${PROFILE.title.toLowerCase()} basé à ${PROFILE.location}.`;

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: SITE_TITLE,
        template: `%s · ${PROFILE.name}`,
    },
    description: SITE_DESCRIPTION,
    applicationName: PROFILE.name,
    authors: [{ name: PROFILE.name }],
    creator: PROFILE.name,
    keywords: [
        "portfolio",
        "ingénieur logiciel",
        "Next.js",
        "TypeScript",
        "Java",
        PROFILE.location,
        PROFILE.name,
    ],
    openGraph: {
        type: "website",
        locale: "fr_FR",
        url: "/",
        siteName: PROFILE.name,
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        // TODO: ajouter une image OG (1200x630) dans /public/og.png et décommenter.
        // images: [{ url: "/og.png", width: 1200, height: 630, alt: PROFILE.name }],
    },
    twitter: {
        card: "summary_large_image",
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        // images: ["/og.png"],
    },
    robots: {
        index: true,
        follow: true,
    },
    icons: {
        icon: "/favicon.ico",
    },
};

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
    ],
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
