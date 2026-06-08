import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

function applyTheme(dark) {
  document.documentElement.classList.toggle("dark", dark);
}

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("taha_theme");
    if (saved === null) return true;
    return saved === "dark";
  });

  useEffect(() => {
    applyTheme(dark);
    localStorage.setItem("taha_theme", dark ? "dark" : "light");
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#0C1222" : "#F5F3FF");
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark((d) => !d), setDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
