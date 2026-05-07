import { allMessages, getI18nInstance } from "@/appRouterI18n";
import { SiteLayout } from "@/components/layout/site-layout";
import { LinguiClientProvider } from "@/context/LinguiClientProvider";
import { initLingui, PageLangParam } from "@/initLingui";
import { BASE_URL } from "@/lib/config";
import { msg } from "@lingui/core/macro";
import type { Viewport } from "next";
import { Chakra_Petch, Orbitron } from "next/font/google";
import { PropsWithChildren } from "react";
import linguiConfig from "../../../lingui.config";
import "./globals.css";

// 🔹 Font setup
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const chakraPetch = Chakra_Petch({
  subsets: ["latin", "latin-ext", "vietnamese"],
  variable: "--font-chakra-petch",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// 🔹 Viewport config
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// 🔹 Static params for locales
export async function generateStaticParams() {
  return linguiConfig.locales.map((lang: string) => ({ lang }));
}

// 🔹 Metadata SEO per locale
export async function generateMetadata(props: PageLangParam) {
  const lang = (await props.params).lang;
  const i18n = getI18nInstance(lang);

  return {
    metadataBase: new URL(BASE_URL),
    title: i18n._(msg`DreamForge — Hackathon Event Platform`),
    description: i18n._(
      msg`Build Ideas Into Reality. A demo platform where developers, designers, and innovators explore hackathon challenges.`
    ),
    alternates: {
      canonical: `${BASE_URL}/${lang}`,
      languages: {
        en: `${BASE_URL}/en`,
        vi: `${BASE_URL}/vi`,
        "x-default": `${BASE_URL}/en`,
      },
    },
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: i18n._(msg`DreamForge — Hackathon Event Platform`),
      description: i18n._(
        msg`Build Ideas Into Reality. A demo platform where developers, designers, and innovators explore hackathon challenges.`
      ),
      locale: lang === "vi" ? "vi_VN" : "en_US",
      url: `${BASE_URL}/${lang}`,
      siteName: "DreamForge",
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: "DreamForge — Hackathon Event Platform",
        },
      ],
      type: "website",
    },
  };
}

// 🔹 Layout
export default async function RootLayout({
  children,
  params,
}: PropsWithChildren<PageLangParam>) {
  const lang = (await params).lang;

  initLingui(lang);

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`
          ${chakraPetch.variable}
          ${orbitron.variable}
          antialiased text-foreground
        `}
      >
        <LinguiClientProvider
          initialLocale={lang}
          initialMessages={allMessages[lang]!}
        >
          <SiteLayout>{children}</SiteLayout>
        </LinguiClientProvider>
      </body>
    </html>
  );
}
