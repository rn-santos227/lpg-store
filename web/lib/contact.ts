import type { Contact } from "../@types/contact";

export const contactInfoPlaceholder: Contact = {
  address: "Address details coming soon.",
  contactNumbers: [
    { label: "Main line", number: "Contact numbers coming soon." },
  ],
  email: "Email address coming soon.",
  operationsHours: [{ label: "Operations hours", hours: "To be announced." }],
  socialMedia: [{ platform: "Social media", url: "https://example.com" }],
  mapEmbedUrl: null,
  mapLink: null,
};

export const normalizeContactInfo = (
  data?: Partial<Contact> | null,
): Contact => {
  const operationsHours =
    data?.operationsHours?.length && data.operationsHours.some((entry) => entry.label || entry.hours)
      ? data.operationsHours
      : contactInfoPlaceholder.operationsHours;
  const contactNumbers =
    data?.contactNumbers?.length && data.contactNumbers.some((entry) => entry.label || entry.number)
      ? data.contactNumbers
      : contactInfoPlaceholder.contactNumbers;
  const socialMedia =
    data?.socialMedia?.length && data.socialMedia.some((entry) => entry.platform || entry.url)
      ? data.socialMedia
      : contactInfoPlaceholder.socialMedia;

  return {
    address: data?.address?.trim() || contactInfoPlaceholder.address,
    contactNumbers,
    email: data?.email?.trim() || contactInfoPlaceholder.email,
    operationsHours,
    socialMedia,
    mapEmbedUrl: data?.mapEmbedUrl ?? contactInfoPlaceholder.mapEmbedUrl,
    mapLink: data?.mapLink ?? contactInfoPlaceholder.mapLink,
  };
};
