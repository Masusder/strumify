import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { headers } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";

import { Theme } from '@radix-ui/themes';

import Header from "./_components/Main/Header/header";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Strumify",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={inter.className + " dark"}>
        <TRPCReactProvider headers={headers()}>
          <Theme appearance="inherit" accentColor="tomato" panelBackground="solid" radius="large">
            <Header />
            {children}
          </Theme>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
