import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";
import { useLocalized } from "../hooks/useLocalized";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { t } = useLanguage();
  const { profile } = useLocalized();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#about", label: t("nav.about") },
    { href: "#experience", label: t("nav.experience") },
    { href: "#education", label: t("nav.education") },
    { href: "#skills", label: t("nav.skills") },
    { href: "#certifications", label: t("nav.certifications") },
    { href: "#contact", label: t("nav.contact") },
  ];

  const initial = profile.name.charAt(0);

  return (
    <header className="nav">
      <div className="container nav-inner">
        <a href="#" className="nav-brand">
          <span className="nav-mark">{initial}</span>
          {profile.name}
        </a>
        <div className="nav-end">
          <nav className="nav-desktop">
            <ul className="nav-links">
              {links.map((l) => (
                <li key={l.href}><a href={l.href} className="nav-link">{l.label}</a></li>
              ))}
              <li><a href="#contact" className="btn btn-primary nav-cta" style={{ padding: "0.5rem 1rem", fontSize: "0.8rem" }}>{t("nav.contactCta")}</a></li>
            </ul>
          </nav>
          <div className="nav-tools">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
          <button type="button" className="nav-toggle" onClick={() => setOpen(!open)} aria-label={t("common.menu")}>
            {open ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="container nav-mobile">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link" onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <a href="#contact" className="btn btn-primary" style={{ marginTop: "0.5rem" }} onClick={() => setOpen(false)}>{t("nav.contactMe")}</a>
        </div>
      )}
    </header>
  );
}
