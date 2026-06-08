import { createContext, useContext, useEffect, useState, useCallback } from "react";
import ar from "../i18n/ar";
import en from "../i18n/en";

const translations = { ar, en };
const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem("taha_lang");
    if (saved === "ar" || saved === "en") return saved;
    return "ar";
  });

  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    localStorage.setItem("taha_lang", lang);
  }, [lang]);

  const toggle = () => setLang((l) => (l === "ar" ? "en" : "ar"));

  const t = useCallback(
    (key) => {
      const keys = key.split(".");
      let val = translations[lang];
      for (const k of keys) {
        if (val == null) return key;
        val = val[k];
      }
      return val ?? key;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t, isRtl: lang === "ar" }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
