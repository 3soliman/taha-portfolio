import { motion } from "framer-motion";

export default function SectionHeader({ num, eyebrow, title, desc, light }) {
  return (
    <motion.header
      className={`section-header ${light ? "section-header-light" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="section-header-side">
        <span className="section-num">{num}</span>
        <span className="section-line" />
      </div>
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2 className="section-title">{title}</h2>
        {desc && <p className="section-desc">{desc}</p>}
      </div>
    </motion.header>
  );
}
