"use client";

export type SupportInquiryValues = {
  name: string;
  email: string;
  phone: string;
  topic: string;
  orderId: string;
  message: string;
};

export type SupportInquiryErrors = Partial<
  Record<keyof SupportInquiryValues, string>
>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getPhoneDigits = (value: string) => value.replace(/\D/g, "");

export const validateSupportInquiry = (values: SupportInquiryValues) => {
  const nextErrors: SupportInquiryErrors = {};
  const trimmedName = values.name.trim();
  const trimmedEmail = values.email.trim();
  const trimmedMessage = values.message.trim();
  const trimmedOrderId = values.orderId.trim();
  const phoneDigits = getPhoneDigits(values.phone);

  if (trimmedName.length < 2) {
    nextErrors.name = "Enter your full name.";
  } else if (trimmedName.length > 60) {
    nextErrors.name = "Name should be 60 characters or fewer.";
  }

  if (!trimmedEmail) {
    nextErrors.email = "Enter your email address.";
  } else if (!emailPattern.test(trimmedEmail)) {
    nextErrors.email = "Use a valid email format.";
  }

  if (values.phone.trim() && (phoneDigits.length < 10 || phoneDigits.length > 15)) {
    nextErrors.phone = "Enter a valid phone number.";
  }

  if (!values.topic) {
    nextErrors.topic = "Select an inquiry topic.";
  }

  if (trimmedOrderId && (trimmedOrderId.length < 4 || trimmedOrderId.length > 20)) {
    nextErrors.orderId = "Order reference should be 4-20 characters.";
  }

  if (trimmedMessage.length < 10) {
    nextErrors.message = "Please add more details (at least 10 characters).";
  } else if (trimmedMessage.length > 500) {
    nextErrors.message = "Message should be 500 characters or fewer.";
  }

  return nextErrors;
};
