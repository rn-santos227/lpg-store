import type { Contact } from "../@types/contact";

export const contactInfoPlaceholder: Contact = {
  address: "Address details coming soon.",
  contactNumber: "Contact number coming soon.",
  email: "Email address coming soon.",
  operationsHours: [{ label: "Operations hours", hours: "To be announced." }],
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

  return {
    address: data?.address?.trim() || contactInfoPlaceholder.address,
    contactNumber: data?.contactNumber?.trim() || contactInfoPlaceholder.contactNumber,
    email: data?.email?.trim() || contactInfoPlaceholder.email,
    operationsHours,
    mapEmbedUrl: data?.mapEmbedUrl ?? contactInfoPlaceholder.mapEmbedUrl,
    mapLink: data?.mapLink ?? contactInfoPlaceholder.mapLink,
  };
};

