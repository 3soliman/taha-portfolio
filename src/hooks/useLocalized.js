import { useLanguage } from "../context/LanguageContext";
import { useContent } from "../context/ContentContext";

export function useLocalized() {
  const { lang } = useLanguage();
  const { content } = useContent();
  const locale = content[lang] || content.ar;

  return {
    lang,
    profile: {
      ...content.shared,
      ...locale.profile,
    },
    about: locale.about,
    experience: locale.experience,
    education: locale.education,
    skills: locale.skills,
    certifications: locale.certifications.map((cert) => ({
      ...cert,
      image: content.shared.certImages?.[cert.id] || "",
    })),
    contact: locale.contact,
  };
}
