import { motion } from "framer-motion";
import { FiHeadphones, FiClipboard, FiInstagram, FiEdit3, FiMonitor } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";
import { useLocalized } from "../hooks/useLocalized";
import SectionHeader from "./SectionHeader";

const skillMeta = {
  cs: { icon: FiHeadphones, cls: "skill-icon-cs" },
  va: { icon: FiClipboard, cls: "skill-icon-va" },
  social: { icon: FiInstagram, cls: "skill-icon-social" },
  writing: { icon: FiEdit3, cls: "skill-icon-writing" },
  tools: { icon: FiMonitor, cls: "skill-icon-tools" },
};

export default function Skills() {
  const { t } = useLanguage();
  const { skills } = useLocalized();

  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHeader
          num="04"
          eyebrow={t("sections.skills.eyebrow")}
          title={t("sections.skills.title")}
          desc={t("sections.skills.desc")}
        />
        <div className="skills-grid">
          {skills.map((group, i) => {
            const meta = skillMeta[group.id] || { icon: FiMonitor, cls: "skill-icon-tools" };
            const Icon = meta.icon;
            return (
              <motion.div
                key={group.id}
                className="card skill-card card-lift"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <div className="skill-head">
                  <div className={`skill-icon ${meta.cls}`}><Icon size={18} /></div>
                  <h3>{group.title}</h3>
                </div>
                <div className="skill-body">
                  <div className="skill-tags">
                    {group.items.map((item) => <span key={item} className="skill-tag">{item}</span>)}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
