import { useContent } from "../context/ContentContext";

export default function Footer() {
  const { content } = useContent();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p className="footer-brand">{content.profile.name}</p>
        <p className="footer-copy">© {year} {content.profile.title} · {content.profile.location}</p>
      </div>
    </footer>
  );
}
