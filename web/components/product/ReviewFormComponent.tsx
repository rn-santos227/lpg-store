"use client";

import { useState, type FormEvent } from "react";

import { Button, RatingInput, TextArea, TextField } from "../ui";

type ReviewFormValues = {
  name: string;
  rating: number;
  comment: string;
};

type ReviewFormComponentProps = {
  productName: string;
  onSubmit: (values: ReviewFormValues) => void;
};

const initialState: ReviewFormValues = {
  name: "",
  rating: 0,
  comment: "",
};


