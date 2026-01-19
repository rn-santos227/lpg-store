export type ContactOperationsHours = {
  label: string;
  hours: string;
};

export type Contact = {
  address: string;
  contactNumber: string;
  email: string;
  operationsHours: ContactOperationsHours[];
  mapEmbedUrl?: string | null;
  mapLink?: string | null;
};
