import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useContent } from "../context/ContentContext";

const links = [
  { href: "#about", label: "نبذة" },
  { href: "#experience", label: "الخبرات" },
  { href: "#education", label: "التعليم" },
  { href: "#skills", label: "المهارات" },
  { href: "#certifications", label: "الشهادات" },
  { href: "#contact", label: "تواصل" },
];

export default function Navbar() {
  const { content } = useContent();
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <div className="container nav-inner">
        <a href="#" className="nav-brand">
          <span className="nav-mark">ط</span>
          {content.profile.name}
        </a>
        <nav>
          <ul className="nav-links">
            {links.map((l) => (
              <li key={l.href}><a href={l.href} className="nav-link">{l.label}</a></li>
            ))}
            <li><a href="#contact" className="btn btn-primary nav-cta" style={{ padding: "0.5rem 1rem", fontSize: "0.8rem" }}>تواصل</a></li>
          </ul>
        </nav>
        <button type="button" className="nav-toggle" onClick={() => setOpen(!open)} aria-label="القائمة">
          {open ? <FiX size={18} /> : <FiMenu size={18} />}
        </button>
      </div>
      {open && (
        <div className="container nav-mobile">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link" onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <a href="#contact" className="btn btn-primary" style={{ marginTop: "0.5rem" }} onClick={() => setOpen(false)}>تواصل معي</a>
        </div>
      )}
    </header>
  );
}
