export type Review = {
  id: string;
  rating: number;
  comment?: string | null;
  createdAt?: string | null;
  customerName?: string | null;
  status?: "approved" | "pending";
};
