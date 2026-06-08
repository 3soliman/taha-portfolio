import { motion } from "framer-motion";
import { FiMail, FiMapPin, FiArrowDown, FiHeadphones } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";
import { useLocalized } from "../hooks/useLocalized";

export default function Hero() {
  const { t } = useLanguage();
  const { profile } = useLocalized();
  const initial = profile.name.charAt(0);

  return (
    <section className="hero">
      <div className="container hero-grid">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            {t("hero.badge")}
          </div>
          <h1 className="hero-name">
            <span className="hero-greeting">{t("hero.greeting")}</span>
            <span className="hero-name-highlight">{profile.name}</span>
          </h1>
          <p className="hero-role">{profile.title}</p>
          <p className="hero-loc"><FiMapPin size={16} /> {profile.location}</p>
          <p className="hero-lead">{profile.tagline}</p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">{t("hero.contactMe")}</a>
            <a href="#experience" className="btn btn-outline"><FiArrowDown size={16} /> {t("hero.explore")}</a>
            {profile.email && (
              <a href={`mailto:${profile.email}`} className="btn btn-ghost"><FiMail size={16} /> {t("hero.email")}</a>
            )}
          </div>
          {profile.stats && (
            <div className="hero-stats">
              {profile.stats.map((s) => (
                <div key={s.label} className="hero-stat">
                  <p className="hero-stat-val">{s.value}</p>
                  <p className="hero-stat-lbl">{s.label}</p>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          className={`hero-visual${profile.image ? "" : " hero-visual--placeholder"}`}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="hero-photo-ring" />
          <div className="hero-photo">
            {profile.image ? (
              <img src={profile.image} alt={profile.name} />
            ) : (
              <span className="hero-photo-fallback">{initial}</span>
            )}
          </div>
          <div className="hero-float-card hero-float-card-1">
            <FiHeadphones style={{ display: "inline", marginInlineEnd: "0.35rem" }} />
            {t("hero.floatCs")}
          </div>
          <div className="hero-float-card hero-float-card-2">{t("hero.floatPro")}</div>
        </motion.div>
      </div>
    </section>
  );
}
