"use client";
import { SessionProvider } from "next-auth/react";

export function SessionProv({ children }: { children: React.ReactNode }) {
    return <SessionProvider>{children}</SessionProvider>;
}