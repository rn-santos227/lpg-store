"use client";

export type ServiceBookingValues = {
  name: string;
  phone: string;
  email: string;
  address: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
};

export type ServiceBookingErrors = Partial<
  Record<keyof ServiceBookingValues, string>
>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getPhoneDigits = (value: string) => value.replace(/\D/g, "");

export const validateServiceBooking = (values: ServiceBookingValues) => {
  const nextErrors: ServiceBookingErrors = {};
  const trimmedName = values.name.trim();
  const trimmedEmail = values.email.trim();
  const trimmedAddress = values.address.trim();
  const trimmedNotes = values.notes.trim();
  const trimmedDate = values.preferredDate.trim();
  const trimmedTime = values.preferredTime.trim();
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
    nextErrors.address = "Enter a full service address (at least 10 characters).";
  } else if (trimmedAddress.length > 240) {
    nextErrors.address = "Address should be 240 characters or fewer.";
  }

  if (!trimmedDate) {
    nextErrors.preferredDate = "Choose a preferred booking date.";
  }

  if (!trimmedTime) {
    nextErrors.preferredTime = "Choose a preferred booking time.";
  }

  if (trimmedNotes.length > 300) {
    nextErrors.notes = "Notes should be 300 characters or fewer.";
  }

  return nextErrors;
};
