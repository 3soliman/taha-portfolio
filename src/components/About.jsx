import { motion } from "framer-motion";
import { useContent } from "../context/ContentContext";
import SectionHeader from "./SectionHeader";

export default function About() {
  const { content } = useContent();
  const paragraphs = content.about.paragraphs;

  return (
    <section id="about" className="section section-alt">
      <div className="container">
        <SectionHeader
          num="01"
          eyebrow="من أنا"
          title="نبذة مهنية"
          desc="خبرة تجمع بين خدمة العملاء، الترجمة، والإدارة الرقمية"
        />
        <div className="about-grid">
          <motion.div
            className="card about-quote card-lift"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="about-quote-icon">❝</div>
            <p>{paragraphs[0]}</p>
          </motion.div>
          <div className="about-cards">
            {paragraphs.slice(1).map((p, i) => (
              <motion.div
                key={i}
                className="card about-card card-lift"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <span className="about-card-num">{String(i + 2).padStart(2, "0")}</span>
                <p>{p}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
