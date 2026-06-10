import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { defaultContent } from "../data/defaultContent";
import { mergeContent, toPublicJson, fetchRemoteContent } from "../utils/contentMerge";

const STORAGE_KEY = "portfolio_taha_v1";

function loadLocal() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return mergeContent(parsed, parsed.admin);
    }
  } catch { /* */ }
  return defaultContent;
}

function saveLocal(content) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
}

const ContentContext = createContext();

export function ContentProvider({ children }) {
  const [content, setContent] = useState(defaultContent);
  const [ready, setReady] = useState(false);
  const [source, setSource] = useState("default");

  useEffect(() => {
    let cancelled = false;

    async function init() {
      const localAdmin = (() => {
        try {
          const saved = localStorage.getItem(STORAGE_KEY);
          if (saved) return JSON.parse(saved).admin;
        } catch { /* */ }
        return defaultContent.admin;
      })();

      try {
        const remote = await fetchRemoteContent();
        if (!cancelled && remote) {
          const merged = mergeContent(remote, localAdmin);
          setContent(merged);
          saveLocal(merged);
          setSource("remote");
          setReady(true);
          return;
        }
      } catch { /* */ }

      if (!cancelled) {
        setContent(loadLocal());
        setSource("local");
        setReady(true);
      }
    }

    init();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (ready) saveLocal(content);
  }, [content, ready]);

  const updateShared = (data) => setContent((p) => ({ ...p, shared: { ...p.shared, ...data } }));
  const updateLocale = (lang, section, data) =>
    setContent((p) => ({ ...p, [lang]: { ...p[lang], [section]: { ...p[lang][section], ...data } } }));
  const replaceLocale = (lang, section, data) =>
    setContent((p) => ({ ...p, [lang]: { ...p[lang], [section]: data } }));
  const reset = () => {
    setContent(defaultContent);
    localStorage.removeItem(STORAGE_KEY);
    setSource("default");
  };
  const setPassword = (password) => setContent((p) => ({ ...p, admin: { password } }));
  const replaceContent = (next) => setContent(next);

  const downloadForPublish = useCallback(() => {
    const blob = new Blob([toPublicJson(content)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "content.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [content]);

  const importFromFile = useCallback((file) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        setContent((prev) => mergeContent(parsed, prev.admin));
        setSource("import");
      } catch {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  }, []);

  const reloadRemote = useCallback(async () => {
    try {
      const remote = await fetchRemoteContent();
      if (remote) {
        setContent((prev) => mergeContent(remote, prev.admin));
        setSource("remote");
        return true;
      }
    } catch { /* */ }
    return false;
  }, []);

  return (
    <ContentContext.Provider
      value={{
        content,
        ready,
        source,
        updateShared,
        updateLocale,
        replaceLocale,
        reset,
        setPassword,
        replaceContent,
        downloadForPublish,
        importFromFile,
        reloadRemote,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export const useContent = () => useContext(ContentContext);
