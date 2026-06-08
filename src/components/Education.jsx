import { motion } from "framer-motion";
import { FiBookOpen } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";
import { useLocalized } from "../hooks/useLocalized";
import SectionHeader from "./SectionHeader";

export default function Education() {
  const { t } = useLanguage();
  const { education } = useLocalized();

  return (
    <section id="education" className="section section-alt">
      <div className="container">
        <SectionHeader
          num="03"
          eyebrow={t("sections.education.eyebrow")}
          title={t("sections.education.title")}
          desc={t("sections.education.desc")}
        />
        <div className="edu-grid">
          {education.map((edu, i) => (
            <motion.article
              key={edu.id}
              className="card edu-card card-lift"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="edu-top">
                <div className="edu-icon"><FiBookOpen size={20} /></div>
                <h3 className="edu-degree">{edu.degree}</h3>
                <p className="edu-school">{edu.school}</p>
              </div>
              <div className="edu-body">
                <div className="edu-meta">
                  <span className="edu-tag">{edu.location}</span>
                  <span className="edu-tag">{edu.period}</span>
                </div>
                <p className="edu-note">{edu.note}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
