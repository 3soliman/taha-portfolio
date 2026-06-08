import { createContext, useContext, useEffect, useState } from "react";
import { defaultContent } from "../data/defaultContent";

const STORAGE_KEY = "portfolio_taha_v1";

function isBilingual(data) {
  return data && data.ar && data.en && data.shared;
}

function migrateFlat(data) {
  const { profile, about, experience, education, skills, certifications, contact, admin } = data;
  return {
    shared: {
      image: profile?.image ?? defaultContent.shared.image,
      email: profile?.email ?? defaultContent.shared.email,
      phone: profile?.phone ?? defaultContent.shared.phone,
      whatsapp: profile?.whatsapp ?? defaultContent.shared.whatsapp,
      linkedin: profile?.linkedin ?? defaultContent.shared.linkedin,
      certImages: defaultContent.shared.certImages,
    },
    ar: {
      profile: {
        name: profile?.name ?? defaultContent.ar.profile.name,
        title: profile?.title ?? defaultContent.ar.profile.title,
        location: profile?.location ?? defaultContent.ar.profile.location,
        tagline: profile?.tagline ?? defaultContent.ar.profile.tagline,
        stats: profile?.stats ?? defaultContent.ar.profile.stats,
      },
      about: about ?? defaultContent.ar.about,
      experience: experience ?? defaultContent.ar.experience,
      education: education ?? defaultContent.ar.education,
      skills: skills ?? defaultContent.ar.skills,
      certifications: certifications ?? defaultContent.ar.certifications,
      contact: contact ?? defaultContent.ar.contact,
    },
    en: defaultContent.en,
    admin: admin ?? defaultContent.admin,
  };
}

function mergeContent(saved) {
  if (!saved) return defaultContent;
  const base = isBilingual(saved) ? saved : migrateFlat(saved);
  return {
    shared: {
      ...defaultContent.shared,
      ...base.shared,
      certImages: { ...defaultContent.shared.certImages, ...base.shared?.certImages },
    },
    ar: {
      profile: { ...defaultContent.ar.profile, ...base.ar?.profile },
      about: base.ar?.about ?? defaultContent.ar.about,
      experience: base.ar?.experience ?? defaultContent.ar.experience,
      education: base.ar?.education ?? defaultContent.ar.education,
      skills: base.ar?.skills ?? defaultContent.ar.skills,
      certifications: base.ar?.certifications ?? defaultContent.ar.certifications,
      contact: { ...defaultContent.ar.contact, ...base.ar?.contact },
    },
    en: {
      profile: { ...defaultContent.en.profile, ...base.en?.profile },
      about: base.en?.about ?? defaultContent.en.about,
      experience: base.en?.experience ?? defaultContent.en.experience,
      education: base.en?.education ?? defaultContent.en.education,
      skills: base.en?.skills ?? defaultContent.en.skills,
      certifications: base.en?.certifications ?? defaultContent.en.certifications,
      contact: { ...defaultContent.en.contact, ...base.en?.contact },
    },
    admin: { ...defaultContent.admin, ...base.admin },
  };
}

function load() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return mergeContent(JSON.parse(saved));
  } catch { /* */ }
  return defaultContent;
}

const ContentContext = createContext();

export function ContentProvider({ children }) {
  const [content, setContent] = useState(load);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  }, [content]);

  const updateShared = (data) => setContent((p) => ({ ...p, shared: { ...p.shared, ...data } }));
  const updateLocale = (lang, section, data) =>
    setContent((p) => ({ ...p, [lang]: { ...p[lang], [section]: { ...p[lang][section], ...data } } }));
  const replaceLocale = (lang, section, data) =>
    setContent((p) => ({ ...p, [lang]: { ...p[lang], [section]: data } }));
  const reset = () => { setContent(defaultContent); localStorage.removeItem(STORAGE_KEY); };
  const setPassword = (password) => setContent((p) => ({ ...p, admin: { password } }));

  return (
    <ContentContext.Provider value={{ content, updateShared, updateLocale, replaceLocale, reset, setPassword }}>
      {children}
    </ContentContext.Provider>
  );
}

export const useContent = () => useContext(ContentContext);
