import { useState } from "react";
import { motion } from "framer-motion";
import { FiAward, FiMaximize2, FiX } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";
import { useLocalized } from "../hooks/useLocalized";
import SectionHeader from "./SectionHeader";

export default function Certifications() {
  const { t } = useLanguage();
  const { certifications } = useLocalized();
  const [preview, setPreview] = useState(null);

  return (
    <section id="certifications" className="section section-alt">
      <div className="container">
        <SectionHeader
          num="05"
          eyebrow={t("sections.certifications.eyebrow")}
          title={t("sections.certifications.title")}
          desc={t("sections.certifications.desc")}
        />
        <div className="cert-grid">
          {certifications.map((cert, i) => (
            <motion.article
              key={cert.id}
              className="card cert-card card-lift"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              {cert.image ? (
                <button type="button" className="cert-image-wrap" onClick={() => setPreview(cert)} aria-label={t("admin.certView")}>
                  <img src={cert.image} alt={cert.title} className="cert-image" />
                  <span className="cert-image-zoom"><FiMaximize2 size={14} /></span>
                </button>
              ) : (
                <div className="cert-top" />
              )}
              <div className="cert-body">
                {!cert.image && <div className="cert-icon"><FiAward size={20} /></div>}
                <p className="cert-date">{cert.date}</p>
                <h3 className="cert-title">{cert.title}</h3>
                <p className="cert-issuer">{cert.issuer}</p>
                <p className="cert-desc">{cert.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {preview && (
        <div className="cert-modal" onClick={() => setPreview(null)} role="dialog" aria-modal="true">
          <div className="cert-modal-inner" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="cert-modal-close" onClick={() => setPreview(null)} aria-label="Close">
              <FiX size={20} />
            </button>
            <img src={preview.image} alt={preview.title} className="cert-modal-img" />
            <p className="cert-modal-title">{preview.title}</p>
          </div>
        </div>
      )}
    </section>
  );
}
