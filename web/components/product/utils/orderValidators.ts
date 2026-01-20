"use client";

export type ProductOrderValues = {
  name: string;
  phone: string;
  email: string;
  address: string;
  quantity: number;
  deliveryNotes: string;
  latitude: string;
  longitude: string;
};

export type ProductOrderErrors = Partial<
  Record<keyof ProductOrderValues, string>
>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getPhoneDigits = (value: string) => value.replace(/\D/g, "");


const isValidCoordinate = (value: string, min: number, max: number) => {
  if (!value.trim()) return false;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= min && parsed <= max;
};


export const validateProductOrder = (values: ProductOrderValues) => {
  const nextErrors: ProductOrderErrors = {};
  const trimmedName = values.name.trim();
  const trimmedEmail = values.email.trim();
  const trimmedAddress = values.address.trim();
  const trimmedNotes = values.deliveryNotes.trim();
  const phoneDigits = getPhoneDigits(values.phone);


}
