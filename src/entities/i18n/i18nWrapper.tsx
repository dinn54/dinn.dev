// app/I18nWrapper.tsx
import { I18nProvider } from "./i18nContext";

export default function I18nWrapper({ children, lang }: { children: React.ReactNode, lang: string }) {
  return <I18nProvider initialLang={lang}>{children}</I18nProvider>;
}
