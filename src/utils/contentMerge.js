import { defaultContent } from "../data/defaultContent";

export function isBilingual(data) {
  return data && data.ar && data.en && data.shared;
}

export function migrateFlat(data) {
  const { profile, about, experience, education, skills, certifications, contact, admin } = data;
  return {
    shared: {
      image: profile?.image || defaultContent.shared.image,
      email: profile?.email || defaultContent.shared.email,
      phone: profile?.phone || defaultContent.shared.phone,
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

export function mergeContent(saved, keepAdmin) {
  if (!saved) return { ...defaultContent, admin: keepAdmin ?? defaultContent.admin };
  const base = isBilingual(saved) ? saved : migrateFlat(saved);
  return {
    shared: {
      ...defaultContent.shared,
      ...base.shared,
      image: base.shared?.image || defaultContent.shared.image,
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
    admin: keepAdmin ?? { ...defaultContent.admin, ...base.admin },
  };
}

export function toPublicJson(content) {
  const { admin, ...publicData } = content;
  return JSON.stringify(publicData, null, 2);
}

export async function fetchRemoteContent() {
  const res = await fetch(`/content.json?t=${Date.now()}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}
