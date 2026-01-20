export type OrderCustomerSnapshot = {
  name: string;
  phone: string;
  email?: string | null;
  address: string;
  location?: {
    lat: number;
    lng: number;
  } | null;
};

export type OrderProductSnapshot = {
  name: string;
  sizeKg?: number | null;
  price?: number | null;
};

export type OrderLineItem = {
  productId: string;
  productSnapshot: OrderProductSnapshot;
  quantity: number;
};

export type Order = {
  id: string;
  customerId: string;
  customerSnapshot: OrderCustomerSnapshot;
  items: OrderLineItem[];
  deliveryNotes?: string | null;
  status?:
    | "pending"
    | "confirmed"
    | "out_for_delivery"
    | "delivered"
    | "cancelled";
  createdAt: string;
};
