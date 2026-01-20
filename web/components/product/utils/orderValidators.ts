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

  if (trimmedName.length < 2) {
    nextErrors.name = "Enter the customer name.";
  } else if (trimmedName.length > 60) {
    nextErrors.name = "Name should be 60 characters or fewer.";
  }

  if (phoneDigits.length < 10 || phoneDigits.length > 15) {
    nextErrors.phone = "Enter a valid phone number.";
  }

  if (trimmedEmail && !emailPattern.test(trimmedEmail)) {
    nextErrors.email = "Use a valid email format.";
  }

}
