import GeneralFooterLayout from "../layouts/GeneralFooterLayout";
import GeneralHeaderLayout from "../layouts/GeneralHeaderLayout";
import { ServiceCard } from "./ServiceCardComponent";
import { servicesCatalogQuery } from "../../constants/queries";
import type { Service } from "../../@types/service";
import { fetchSanityQuery } from "../../lib/sanity.api";

const formatPrice = (price?: number | null) => {
  if (!price) {
    return "Custom Quote";
  }

  return `₱${price.toLocaleString("en-PH")}`;
};

export default async function ServicesPageComponent() {
  const services = (await fetchSanityQuery<Service[]>(servicesCatalogQuery)) ?? [];

  return (
    <div className="flex min-h-screen flex-col bg-amber-50 text-slate-900">
      <GeneralHeaderLayout />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-32 pt-12">
        <section className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
            Service information
          </p>
          <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">
            Trusted LPG services for homes and businesses
          </h1>
          <p className="text-lg text-slate-600">
            Book certified inspections, delivery support, and safety assistance
            tailored to your LPG setup.
          </p>
        </section>

        <section className="grid gap-6 rounded-3xl border border-amber-100 bg-white p-8 md:grid-cols-3">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-900">Certified team</h2>
            <p className="text-sm text-slate-600">
              Our technicians are trained to handle LPG inspections and
              maintenance with safety-first protocols.
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-900">Flexible booking</h2>
            <p className="text-sm text-slate-600">
              Schedule visits around your household or business hours, with
              same-day slots when available.
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-900">Dedicated support</h2>
            <p className="text-sm text-slate-600">
              Stay in touch with our support team for safety checks, refills,
              and LPG system upgrades.
            </p>
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Available services
              </p>
            </div>
          </div>
          {services.length ? (
            <div className="grid gap-6 md:grid-cols-3">
              {services.map((service) => (
                <ServiceCard
                  key={service.slug}
                  title={service.title}
                  summary={service.summary}
                  feeLabel={formatPrice(service.fee)}
                  fee={service.fee}
                  imageUrl={service.imageUrl}
                  serviceSlug={service.slug}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              No services are available right now. Please check back soon.
            </p>
          )}
        </section>
      </main>
      <GeneralFooterLayout />
    </div>
  );
}
