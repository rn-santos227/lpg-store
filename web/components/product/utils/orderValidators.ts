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


  if (trimmedAddress.length < 10) {
    nextErrors.address = "Enter a full delivery address (at least 10 characters).";
  } else if (trimmedAddress.length > 240) {
    nextErrors.address = "Address should be 240 characters or fewer.";
  }

  if (!Number.isFinite(values.quantity) || values.quantity < 1 || values.quantity > 50) {
    nextErrors.quantity = "Quantity must be between 1 and 50.";
  }

  if (trimmedNotes.length > 300) {
    nextErrors.deliveryNotes = "Notes should be 300 characters or fewer.";
  }

  if (!isValidCoordinate(values.latitude, -90, 90)) {
    nextErrors.latitude = "Enter a latitude between -90 and 90.";
  }

  if (!isValidCoordinate(values.longitude, -180, 180)) {
    nextErrors.longitude = "Enter a longitude between -180 and 180.";
  }

  return nextErrors;
}
