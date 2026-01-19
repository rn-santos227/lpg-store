export type ContactOperationsHours = {
  label: string;
  hours: string;
};

export type ContactNumber = {
  label: string;
  number: string;
};

export type SocialMediaLink = {
  platform: string;
  url: string;
};

export type Contact = {
  address: string;
  contactNumbers: ContactNumber[];
  email: string;
  operationsHours: ContactOperationsHours[];
  socialMedia: SocialMediaLink[];
  mapEmbedUrl?: string | null;
  mapLink?: string | null;
};
