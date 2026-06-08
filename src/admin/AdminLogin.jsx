import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiLock } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useContent } from "../context/ContentContext";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const { content } = useContent();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(password, content.admin.password)) navigate("/admin/edit");
    else setError("كلمة المرور غير صحيحة");
  };

  return (
    <div className="admin-page">
      <div className="card admin-card">
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <FiLock size={32} style={{ color: "var(--primary)" }} />
          <h1 style={{ margin: "0.75rem 0 0", fontSize: "1.35rem" }}>لوحة التحكم</h1>
          <p style={{ fontSize: "0.85rem", color: "var(--muted)" }}>تخزين محلي — التعديلات تظهر في هذا المتصفح فقط</p>
        </div>
        <form onSubmit={handleSubmit}>
          <label className="label">كلمة المرور</label>
          <input type="password" className="input" value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }} autoFocus />
          {error && <p style={{ color: "#c45c3e", fontSize: "0.85rem" }}>{error}</p>}
          <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "0.75rem" }}>دخول</button>
        </form>
        <p style={{ marginTop: "1rem", fontSize: "0.75rem", color: "var(--muted)", textAlign: "center" }}>
          الافتراضي: admin123 · <Link to="/">العودة للموقع</Link>
        </p>
      </div>
    </div>
  );
}
