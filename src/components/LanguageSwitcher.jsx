import { useLanguage } from "../context/LanguageContext";

export default function LanguageSwitcher() {
  const { lang, setLang, t } = useLanguage();

  return (
    <div className="lang-switch">
      {["ar", "en"].map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          className={lang === l ? "active" : ""}
          aria-label={l === "ar" ? t("common.ar") : t("common.en")}
        >
          {l === "ar" ? "ع" : "EN"}
        </button>
      ))}
    </div>
  );
}
