export type ContactOperationsHours = {
  label: string;
  hours: string;
};

export type ContactInfo = {
  address: string;
  contactNumber: string;
  email: string;
  operationsHours: ContactOperationsHours[];
  mapEmbedUrl?: string | null;
  mapLink?: string | null;
};
