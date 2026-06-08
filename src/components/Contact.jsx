import { useState } from "react";
import { FiMail, FiPhone, FiLinkedin, FiMessageCircle, FiSend } from "react-icons/fi";
import { useContent } from "../context/ContentContext";
import SectionHeader from "./SectionHeader";

export default function Contact() {
  const { content } = useContent();
  const { profile, contact } = content;
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const subject = encodeURIComponent(`تواصل — ${fd.get("name")}`);
    const body = encodeURIComponent(`${fd.get("name")}\n${fd.get("email")}\n\n${fd.get("message")}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const links = [
    profile.email && { icon: FiMail, label: profile.email, href: `mailto:${profile.email}` },
    profile.phone && { icon: FiPhone, label: profile.phone, href: `tel:${profile.phone}` },
    profile.whatsapp && { icon: FiMessageCircle, label: "واتساب", href: `https://wa.me/${profile.whatsapp.replace(/\D/g, "")}` },
    profile.linkedin && { icon: FiLinkedin, label: "LinkedIn", href: profile.linkedin },
  ].filter(Boolean);

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="contact-wrap">
          <div className="contact-inner">
            <div>
              <SectionHeader num="06" eyebrow="تواصل" title={contact.title} desc={contact.subtitle} light />
              <div className="contact-links">
                {links.map(({ icon: Icon, label, href }) => (
                  <a key={label} href={href} className="contact-link" target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                    <span className="contact-link-icon"><Icon size={18} /></span>
                    {label}
                  </a>
                ))}
              </div>
            </div>
            <div className="contact-form">
              {sent ? (
                <p style={{ textAlign: "center", padding: "3rem 1rem", fontWeight: 700, color: "var(--mint)" }}>{contact.successMessage}</p>
              ) : (
                <form onSubmit={handleSubmit}>
                  <label className="label">الاسم</label>
                  <input name="name" required className="input" placeholder="اسمك الكامل" />
                  <label className="label">البريد</label>
                  <input name="email" type="email" required className="input" placeholder="email@example.com" />
                  <label className="label">الرسالة</label>
                  <textarea name="message" required rows={4} className="input admin-textarea" placeholder="كيف يمكنني مساعدتك؟" />
                  <button type="submit" className="btn btn-primary" style={{ width: "100%" }}><FiSend size={16} /> إرسال</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
