import { useContent } from "../context/ContentContext";

export default function ContentLoader({ children }) {
  const { ready } = useContent();
  if (!ready) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)", color: "var(--muted)" }}>
        ...
      </div>
    );
  }
  return children;
}
