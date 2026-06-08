import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

export default function ThemeToggle() {
  const { dark, toggle } = useTheme();
  const { t } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggle}
      className="btn-icon"
      aria-label={dark ? t("common.themeLight") : t("common.themeDark")}
    >
      {dark ? <FiSun size={17} /> : <FiMoon size={17} />}
    </button>
  );
}
