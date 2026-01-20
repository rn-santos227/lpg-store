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


