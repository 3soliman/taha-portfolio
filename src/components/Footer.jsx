import { useLocalized } from "../hooks/useLocalized";

export default function Footer() {
  const { profile } = useLocalized();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p className="footer-brand">{profile.name}</p>
        <p className="footer-copy">© {year} {profile.title} · {profile.location}</p>
      </div>
    </footer>
  );
}
