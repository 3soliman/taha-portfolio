import { motion } from "framer-motion";
import { useContent } from "../context/ContentContext";
import SectionHeader from "./SectionHeader";

export default function Experience() {
  const { content } = useContent();

  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionHeader
          num="02"
          eyebrow="المسيرة"
          title="الخبرات العملية"
          desc="مسار مهني متنوع في خدمة العملاء، المبيعات، الترجمة، والإدارة"
        />
        <div className="timeline">
          {content.experience.map((exp, i) => (
            <motion.div
              key={exp.id}
              className="exp-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <span className="exp-dot" />
              <article className="card exp-card card-lift">
                <div className="exp-head">
                  <div>
                    <h3 className="exp-role">{exp.role}</h3>
                    <p className="exp-company">{exp.company}{exp.location && ` · ${exp.location}`}</p>
                  </div>
                  <span className="exp-period-badge">{exp.period}</span>
                </div>
                <div className="exp-body">
                  <ul className="exp-list">
                    {exp.highlights.map((h) => <li key={h}>{h}</li>)}
                  </ul>
                </div>
              </article>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
