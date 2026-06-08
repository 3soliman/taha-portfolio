import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { FiSave, FiLogOut, FiRefreshCw } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useContent } from "../context/ContentContext";

export default function AdminDashboard() {
  const { isAuthenticated, logout } = useAuth();
  const { content, update, replace, reset, setPassword } = useContent();
  const [profile, setProfile] = useState({ ...content.profile });
  const [about, setAbout] = useState([...content.about.paragraphs]);
  const [contact, setContact] = useState({ ...content.contact });
  const [newPass, setNewPass] = useState("");
  const [saved, setSaved] = useState(false);

  if (!isAuthenticated) return <Navigate to="/admin" replace />;

  const save = () => {
    update("profile", profile);
    replace("about", { paragraphs: about });
    update("contact", contact);
    if (newPass) setPassword(newPass);
    setSaved(true);
    setNewPass("");
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="admin-page">
      <div className="admin-dash">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.75rem" }}>
          <h1 style={{ margin: 0, fontSize: "1.5rem" }}>تعديل المحتوى</h1>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button type="button" className="btn btn-primary" onClick={save}><FiSave /> {saved ? "تم الحفظ ✓" : "حفظ"}</button>
            <Link to="/" className="btn btn-outline">عرض الموقع</Link>
            <button type="button" className="btn btn-ghost" onClick={() => { logout(); }}><FiLogOut /> خروج</button>
          </div>
        </div>

        <div className="card" style={{ padding: "1.5rem", marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1rem", marginTop: 0 }}>البيانات الشخصية</h2>
          {["name", "title", "location", "tagline", "email", "phone", "whatsapp", "linkedin", "image"].map((key) => (
            <div key={key} className="admin-field">
              <label className="label">{key}</label>
              <input className="input" value={profile[key] || ""} onChange={(e) => setProfile((p) => ({ ...p, [key]: e.target.value }))} />
            </div>
          ))}
        </div>

        <div className="card" style={{ padding: "1.5rem", marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1rem", marginTop: 0 }}>النبذة (فقرات)</h2>
          {about.map((p, i) => (
            <div key={i} className="admin-field">
              <label className="label">فقرة {i + 1}</label>
              <textarea className="input admin-textarea" value={p} onChange={(e) => setAbout((arr) => arr.map((x, j) => (j === i ? e.target.value : x)))} />
            </div>
          ))}
        </div>

        <div className="card" style={{ padding: "1.5rem", marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1rem", marginTop: 0 }}>التواصل</h2>
          {["title", "subtitle", "successMessage"].map((key) => (
            <div key={key} className="admin-field">
              <label className="label">{key}</label>
              <input className="input" value={contact[key] || ""} onChange={(e) => setContact((c) => ({ ...c, [key]: e.target.value }))} />
            </div>
          ))}
        </div>

        <div className="card" style={{ padding: "1.5rem", marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1rem", marginTop: 0 }}>كلمة مرور الأدمن</h2>
          <input type="password" className="input" placeholder="كلمة مرور جديدة (اختياري)" value={newPass} onChange={(e) => setNewPass(e.target.value)} />
        </div>

        <div className="card" style={{ padding: "1.5rem" }}>
          <button type="button" className="btn btn-outline" style={{ color: "var(--accent-2)", borderColor: "var(--accent-2)" }} onClick={() => { if (confirm("إعادة كل المحتوى للافتراضي؟")) reset(); }}>
            <FiRefreshCw /> إعادة التعيين
          </button>
        </div>
      </div>
    </div>
  );
}
