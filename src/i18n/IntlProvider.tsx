import React from "react";
import { IntlProvider as ReactIntlProvider } from "react-intl";
import en_gb from "./lang/en-GB.json";

const langs: Record<string, Record<string, string>> = {
  "en-GB": en_gb,
};

const DEFAULT_LOCALE = "en-GB";

interface IntlProviderProps {
  locale: string;
  children: React.ReactNode;
}

const IntlProvider: React.FC<IntlProviderProps> = ({ locale, children }) => (
  <ReactIntlProvider
    messages={langs?.[locale] ?? langs[DEFAULT_LOCALE]}
    locale={locale}
    defaultLocale={DEFAULT_LOCALE}
  >
    {children}
  </ReactIntlProvider>
);

export default IntlProvider;
