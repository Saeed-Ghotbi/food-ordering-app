'use client';

import React, { useMemo, useState } from 'react';
const langContext = React.createContext<string>('');

langContext.displayName = 'LangContext';

export const useLang = () => {
  const context = React.useContext(langContext);
  if (context === undefined)
    throw new Error(`useLang must be used within a LangSystemProvider`);
  return context;
};

export function LangSystemProvider(props: React.PropsWithChildren<any>) {
  let lang: string = '';
  const result = useMemo(() => (lang = props.lang), [props.lang]);
  return <langContext.Provider value={result} {...props} />;
}
