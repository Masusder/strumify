import "~/styles/globals.css";

import React from "react";
import { Inter } from "next/font/google";
import { headers } from "next/headers";

// Providers / Contexts
import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "~/components/Theme/theme-provider";
import { LangProvider } from "~/contexts/LangContext";
import { SessionProv } from "~/contexts/SessionContext";

// Components
import { Header } from "~/components/Layout";
import { Toaster } from "~/components/ui/toaster"

const inter = Inter({
  subsets: ["latin"],
});

// Localization
import { i18n } from '../../i18n-config'
import { getMetadataLocales } from "~/get-dictionary";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

type MetadataParams = {
  params: {
    lang: Locale
  }
}

export async function generateMetadata({ params }: MetadataParams) {
  const t = await getMetadataLocales(params.lang);
  return {
    title: "Strumify",
    description: t.main.description,
    icons: [{ rel: "icon", url: "/favicon.ico" }],
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale }
}) {
  return (
    <html suppressHydrationWarning lang={params.lang}>
      <body className={inter.className}>
        <TRPCReactProvider headers={headers()}>
          <SessionProv>
            <LangProvider initialLang={params.lang}>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <Header params={params} />
                {children}
                <Toaster />
              </ThemeProvider>
            </LangProvider>
          </SessionProv>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
