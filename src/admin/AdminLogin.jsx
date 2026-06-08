import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiLock } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useContent } from "../context/ContentContext";
import { useLanguage } from "../context/LanguageContext";
import LanguageSwitcher from "../components/LanguageSwitcher";
import ThemeToggle from "../components/ThemeToggle";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const { content } = useContent();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(password, content.admin.password)) navigate("/admin/edit");
    else setError(t("admin.wrongPassword"));
  };

  return (
    <div className="admin-page">
      <div style={{ position: "fixed", top: "1rem", insetInlineEnd: "1rem", display: "flex", gap: "0.45rem", zIndex: 10 }}>
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
      <div className="card admin-card">
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <FiLock size={32} style={{ color: "var(--primary)" }} />
          <h1 style={{ margin: "0.75rem 0 0", fontSize: "1.35rem" }}>{t("admin.title")}</h1>
          <p style={{ fontSize: "0.85rem", color: "var(--muted)" }}>{t("admin.subtitle")}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <label className="label">{t("admin.password")}</label>
          <input type="password" className="input" value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }} autoFocus />
          {error && <p style={{ color: "#c45c3e", fontSize: "0.85rem" }}>{error}</p>}
          <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "0.75rem" }}>{t("admin.login")}</button>
        </form>
        <p style={{ marginTop: "1rem", fontSize: "0.75rem", color: "var(--muted)", textAlign: "center" }}>
          {t("admin.defaultHint")} · <Link to="/">{t("admin.back")}</Link>
        </p>
      </div>
    </div>
  );
}
