import { motion } from "framer-motion";
import { FiAward } from "react-icons/fi";
import { useContent } from "../context/ContentContext";
import SectionHeader from "./SectionHeader";

export default function Certifications() {
  const { content } = useContent();

  return (
    <section id="certifications" className="section section-alt">
      <div className="container">
        <SectionHeader
          num="05"
          eyebrow="التطوير"
          title="الشهادات والدورات"
          desc="شهادات معتمدة تعزز الكفاءة في خدمة العملاء والتسويق الرقمي"
        />
        <div className="cert-grid">
          {content.certifications.map((cert, i) => (
            <motion.article
              key={cert.id}
              className="card cert-card card-lift"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="cert-top" />
              <div className="cert-body">
                <div className="cert-icon"><FiAward size={20} /></div>
                <p className="cert-date">{cert.date}</p>
                <h3 className="cert-title">{cert.title}</h3>
                <p className="cert-issuer">{cert.issuer}</p>
                <p className="cert-desc">{cert.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
