import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { FiSave, FiLogOut, FiRefreshCw, FiDownload, FiUpload, FiCloud } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useContent } from "../context/ContentContext";
import { toPublicJson } from "../utils/contentMerge";
import { useLanguage } from "../context/LanguageContext";
import LanguageSwitcher from "../components/LanguageSwitcher";
import ThemeToggle from "../components/ThemeToggle";

export default function AdminDashboard() {
  const { isAuthenticated, logout } = useAuth();
  const { content, replaceContent, reset, setPassword, downloadForPublish, importFromFile, reloadRemote } = useContent();
  const { t, lang } = useLanguage();
  const [tab, setTab] = useState(lang);
  const locale = content[tab];

  const [shared, setShared] = useState({ ...content.shared, certImages: { ...content.shared.certImages } });
  const [profile, setProfile] = useState({ ...locale.profile });
  const [about, setAbout] = useState([...locale.about.paragraphs]);
  const [contact, setContact] = useState({ ...locale.contact });
  const [newPass, setNewPass] = useState("");
  const [saved, setSaved] = useState(false);

  const switchTab = (l) => {
    setTab(l);
    const loc = content[l];
    setProfile({ ...loc.profile });
    setAbout([...loc.about.paragraphs]);
    setContact({ ...loc.contact });
  };

  useEffect(() => {
    switchTab(lang);
  }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isAuthenticated) return <Navigate to="/admin" replace />;

  const save = (andDownload = false) => {
    const next = {
      ...content,
      shared: { ...shared, certImages: { ...shared.certImages } },
      [tab]: {
        ...content[tab],
        profile,
        about: { paragraphs: about },
        contact,
      },
      admin: newPass ? { password: newPass } : content.admin,
    };
    replaceContent(next);
    setSaved(true);
    setNewPass("");
    setTimeout(() => setSaved(false), 2000);
    if (andDownload) {
      const blob = new Blob([toPublicJson(next)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "content.json";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleReloadRemote = async () => {
    const ok = await reloadRemote();
    alert(ok ? t("admin.reloadOk") : t("admin.reloadFail"));
    if (ok) switchTab(tab);
  };

  const profileFields = ["name", "title", "location", "tagline"];
  const sharedFields = ["image", "email", "phone", "whatsapp", "linkedin"];
  const contactFields = ["title", "subtitle", "successMessage"];

  const setCertImage = (id, value) =>
    setShared((p) => ({ ...p, certImages: { ...p.certImages, [id]: value } }));

  const uploadCertImage = (id, file) => {
    if (!file) return;
    if (file.size > 800 * 1024) {
      alert(t("admin.certUploadBig"));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setCertImage(id, reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="admin-page">
      <div className="admin-dash">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.75rem" }}>
          <h1 style={{ margin: 0, fontSize: "1.5rem" }}>{t("admin.editTitle")}</h1>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
            <LanguageSwitcher />
            <ThemeToggle />
            <button type="button" className="btn btn-primary" onClick={() => save(false)}><FiSave /> {saved ? t("admin.saved") : t("admin.save")}</button>
            <button type="button" className="btn btn-outline" onClick={() => save(true)}><FiDownload /> {t("admin.saveAndDownload")}</button>
            <Link to="/" className="btn btn-outline">{t("admin.viewSite")}</Link>
            <button type="button" className="btn btn-ghost" onClick={() => { logout(); }}><FiLogOut /> {t("admin.logout")}</button>
          </div>
        </div>

        <div className="lang-switch" style={{ marginBottom: "1rem", width: "fit-content" }}>
          {["ar", "en"].map((l) => (
            <button key={l} type="button" className={tab === l ? "active" : ""} onClick={() => switchTab(l)}>
              {t(`admin.langTab.${l}`)}
            </button>
          ))}
        </div>

        <div className="card" style={{ padding: "1.5rem", marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1rem", marginTop: 0 }}>{t("admin.profile")} ({t(`admin.langTab.${tab}`)})</h2>
          {profileFields.map((key) => (
            <div key={key} className="admin-field">
              <label className="label">{key}</label>
              <input className="input" value={profile[key] || ""} onChange={(e) => setProfile((p) => ({ ...p, [key]: e.target.value }))} />
            </div>
          ))}
        </div>

        <div className="card" style={{ padding: "1.5rem", marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1rem", marginTop: 0 }}>{t("admin.profile")} — shared</h2>
          <p style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: 0 }}>{t("admin.sharedNote")}</p>
          {sharedFields.map((key) => (
            <div key={key} className="admin-field">
              <label className="label">{key}</label>
              <input className="input" value={shared[key] || ""} onChange={(e) => setShared((p) => ({ ...p, [key]: e.target.value }))} />
            </div>
          ))}
        </div>

        <div className="card" style={{ padding: "1.5rem", marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1rem", marginTop: 0 }}>{t("admin.about")}</h2>
          {about.map((p, i) => (
            <div key={i} className="admin-field">
              <label className="label">{t("admin.paragraph")} {i + 1}</label>
              <textarea className="input admin-textarea" value={p} onChange={(e) => setAbout((arr) => arr.map((x, j) => (j === i ? e.target.value : x)))} />
            </div>
          ))}
        </div>

        <div className="card" style={{ padding: "1.5rem", marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1rem", marginTop: 0 }}>{t("admin.certifications")}</h2>
          <p style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: 0 }}>{t("admin.certImagesNote")}</p>
          {locale.certifications.map((cert) => (
            <div key={cert.id} className="admin-field" style={{ paddingBottom: "1rem", borderBottom: "1px solid var(--line)", marginBottom: "1rem" }}>
              <label className="label">{cert.title}</label>
              <input
                className="input"
                placeholder="/certificates/example.jpg أو https://..."
                value={shared.certImages?.[cert.id] || ""}
                onChange={(e) => setCertImage(cert.id, e.target.value)}
              />
              <div className="cert-upload-row">
                <label className="btn btn-outline" style={{ cursor: "pointer", margin: 0 }}>
                  {t("admin.certUpload")}
                  <input type="file" accept="image/*" hidden onChange={(e) => uploadCertImage(cert.id, e.target.files?.[0])} />
                </label>
                {shared.certImages?.[cert.id] && (
                  <button type="button" className="btn btn-ghost" onClick={() => setCertImage(cert.id, "")}>{t("admin.certRemove")}</button>
                )}
              </div>
              {shared.certImages?.[cert.id] && (
                <img src={shared.certImages[cert.id]} alt="" className="cert-thumb" />
              )}
            </div>
          ))}
        </div>

        <div className="card" style={{ padding: "1.5rem", marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1rem", marginTop: 0 }}>{t("admin.contactSec")}</h2>
          {contactFields.map((key) => (
            <div key={key} className="admin-field">
              <label className="label">{key}</label>
              <input className="input" value={contact[key] || ""} onChange={(e) => setContact((c) => ({ ...c, [key]: e.target.value }))} />
            </div>
          ))}
        </div>

        <div className="card" style={{ padding: "1.5rem", marginBottom: "1rem", borderColor: "rgba(99,102,241,0.35)" }}>
          <h2 style={{ fontSize: "1rem", marginTop: 0 }}>{t("admin.publishTitle")}</h2>
          <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginTop: 0 }}>{t("admin.publishNote")}</p>
          <p style={{ fontSize: "0.8rem", color: "var(--primary)", fontWeight: 600 }}>{t("admin.publishSteps")}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.75rem" }}>
            <button type="button" className="btn btn-primary" onClick={downloadForPublish}><FiDownload /> {t("admin.downloadJson")}</button>
            <label className="btn btn-outline" style={{ cursor: "pointer", margin: 0 }}>
              <FiUpload /> {t("admin.importJson")}
              <input type="file" accept="application/json,.json" hidden onChange={(e) => importFromFile(e.target.files?.[0])} />
            </label>
            <button type="button" className="btn btn-ghost" onClick={handleReloadRemote}><FiCloud /> {t("admin.reloadRemote")}</button>
          </div>
        </div>

        <div className="card" style={{ padding: "1.5rem", marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1rem", marginTop: 0 }}>{t("admin.adminPass")}</h2>
          <input type="password" className="input" placeholder={t("admin.newPassPh")} value={newPass} onChange={(e) => setNewPass(e.target.value)} />
        </div>

        <div className="card" style={{ padding: "1.5rem" }}>
          <button type="button" className="btn btn-outline" onClick={() => { if (confirm(t("admin.resetConfirm"))) reset(); }}>
            <FiRefreshCw /> {t("admin.reset")}
          </button>
        </div>
      </div>
    </div>
  );
}
