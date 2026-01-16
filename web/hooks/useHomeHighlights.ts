"use client";

import { useMemo } from "react";

export type HighlightStat = {
  label: string;
  value: string;
};

export type BundleHighlight = {
  title: string;
  description: string;
  price: string;
};

export type FeaturedProduct = {
  title: string;
  description: string;
  price: string;
  tag: string;
};

export type ServiceHighlight = {
  title: string;
  description: string;
};

export type SafetyMetric = {
  label: string;
  value: string;
  note: string;
};


