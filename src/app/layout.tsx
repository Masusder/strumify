import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { headers } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "~/components/Theme/theme-provider";

import { Header } from "~/components/Layout";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Strumify",
  description: "Strumify - your ultimate guitar companion for creating and sharing tabs, chords, and melodies, making music creation a breeze for guitar enthusiasts of all levels.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={inter.className}>
        <TRPCReactProvider headers={headers()}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
