export type BookingCustomerSnapshot = {
  name: string;
  phone: string;
  email?: string | null;
  address: string;
};

export type BookingServiceSnapshot = {
  title: string;
  fee?: number | null;
};

export type Booking = {
  id: string;
  customerId: string;
  serviceId: string;
  customerSnapshot: BookingCustomerSnapshot;
  serviceSnapshot: BookingServiceSnapshot;
  preferredDate: string;
  preferredTime: string;
  notes?: string | null;
  status?: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
};
