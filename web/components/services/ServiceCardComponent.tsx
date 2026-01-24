"use client";

import { useState } from "react";

import { Button } from "../ui/Button";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/Card";
import ImageViewer from "../ui/ImageViewer";
import ServiceBookingForm from "./ServiceBookingForm";

type ServiceCardProps = {
  title: string;
  summary?: string | null;
  feeLabel?: string | null;
  fee?: number | null;
  imageUrl?: string | null;
  serviceSlug?: string;
};

export function ServiceCard({
  title,
  summary,
  feeLabel,
  fee,
  imageUrl,
  serviceSlug,
}: ServiceCardProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const canBook = Boolean(serviceSlug);

  return (
    <Card className="group flex h-full flex-col overflow-hidden">
      <div className="relative">
        <ImageViewer
          src={imageUrl}
          alt={title}
          className="h-52 w-full"
          imgClassName="transition duration-300 group-hover:scale-105"
        />
      </div>
      <CardContent className="flex flex-1 flex-col gap-3">
        <div className="space-y-2">
          <CardTitle className="text-base">{title}</CardTitle>
          {summary ? (
            <CardDescription>{summary}</CardDescription>
          ) : (
            <CardDescription>
              On-demand support to keep your LPG system safe.
            </CardDescription>
          )}
        </div>
        <div className="mt-auto flex items-center justify-between gap-3">
          {feeLabel ? (
            <span className="text-sm font-semibold text-slate-900">
              {feeLabel}
            </span>
          ) : (
            <span className="text-sm text-slate-500">Custom Quote</span>
          )}
          <Button
            variant="secondary"
            onClick={() => setIsBookingOpen(true)}
            disabled={!canBook}
          >
            Book Now
          </Button>
        </div>
      </CardContent>
      {serviceSlug ? (
        <ServiceBookingForm
          open={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          serviceName={title}
          serviceSlug={serviceSlug}
          fee={fee}
        />
      ) : null}
    </Card>
  );
}
