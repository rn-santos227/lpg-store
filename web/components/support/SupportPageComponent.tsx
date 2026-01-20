import GeneralFooterLayout from "../layouts/GeneralFooterLayout";
import GeneralHeaderLayout from "../layouts/GeneralHeaderLayout";
import type { Contact } from "../../@types/contact";
import { contactInfoQuery } from "../../constants/queries";
import { normalizeContactInfo } from "../../lib/contact";
import { fetchSanityQuery } from "../../lib/sanity.api";
import ContactSection from "./ContactSection";
import CoverageSection from "./CoverageSection";
import PartnerSection from "./PartnerSection";
import SafetySection from "./SafetySection";
import SupportSection from "./SupportSection";

export default async function SupportPageComponent() {
  const contactInfo = normalizeContactInfo(
    await fetchSanityQuery<Contact>(contactInfoQuery),
  );

  return (
    <div className="flex min-h-screen flex-col bg-amber-50 text-slate-900">
      <GeneralHeaderLayout />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-32 pt-12">
        <section className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
            Support center
          </p>
          <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">
            Customer inquiries, safety guidance, and delivery updates
          </h1>
          <p className="text-lg text-slate-600">
            Our care team is ready to assist with LPG refills, inspections, and
            bulk orders. Reach us anytime for quick, reliable answers.
          </p>
        </section>

        <ContactSection contact={contactInfo} />

        <CoverageSection />

        <SupportSection />

        <PartnerSection />

        <SafetySection />
      </main>
      <GeneralFooterLayout />
    </div>
  );
}
