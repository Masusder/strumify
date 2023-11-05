import "~/styles/globals.css";

import React from "react";
import { Inter } from "next/font/google";
import { headers } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "~/components/Theme/theme-provider";

import { Header } from "~/components/Layout";

const inter = Inter({
  subsets: ["latin"],
});

import { i18n } from '../../i18n-config'

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export const metadata = {
  title: "Strumify",
  description: "Strumify - your ultimate guitar companion for creating and sharing tabs, chords, and melodies, making music creation a breeze for guitar enthusiasts of all levels.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string }
}) {
  return (
    <html suppressHydrationWarning lang={params.lang}>
      <body className={inter.className}>
        <TRPCReactProvider headers={headers()}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header params={params} />
            {children}
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
