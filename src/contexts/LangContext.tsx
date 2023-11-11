"use client";
import React, { createContext, ReactNode, useContext } from 'react';

type LangContextType = {
  langClient: Locale;
};

const LangContext = createContext<LangContextType | undefined>(undefined);

export const LangProvider: React.FC<{ children: ReactNode; initialLang: Locale }> = ({ children, initialLang }) => {
  const langClient = initialLang;

  return <LangContext.Provider value={{ langClient }}>{children}</LangContext.Provider>;
};

export const useLang = () => {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error('useLang must be used within a LangProvider');
  }
  return context;
};