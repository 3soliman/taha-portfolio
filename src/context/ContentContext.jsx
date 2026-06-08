import { createContext, useContext, useEffect, useState } from "react";
import { defaultContent } from "../data/defaultContent";

const STORAGE_KEY = "portfolio_taha_v1";

function load() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return { ...defaultContent, ...JSON.parse(saved) };
  } catch { /* */ }
  return defaultContent;
}

const ContentContext = createContext();

export function ContentProvider({ children }) {
  const [content, setContent] = useState(load);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  }, [content]);

  const update = (section, data) => setContent((p) => ({ ...p, [section]: { ...p[section], ...data } }));
  const replace = (section, data) => setContent((p) => ({ ...p, [section]: data }));
  const reset = () => { setContent(defaultContent); localStorage.removeItem(STORAGE_KEY); };
  const setPassword = (password) => setContent((p) => ({ ...p, admin: { password } }));

  return (
    <ContentContext.Provider value={{ content, update, replace, reset, setPassword }}>
      {children}
    </ContentContext.Provider>
  );
}

export const useContent = () => useContext(ContentContext);
