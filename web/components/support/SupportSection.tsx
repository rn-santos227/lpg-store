import { Accordion } from "../ui/Accordion";
import SupportInquiryForm from "./SupportInquiryForm";

const faqs = [
  {
    title: "How fast can I schedule a delivery?",
    content:
      "Most refills are delivered within 24 hours. Same-day delivery is available for select Metro Manila zones when you order before noon.",
  },
  {
    title: "What should I do if I smell gas?",
    content:
      "Turn off the regulator, open windows, and avoid any flames or switches. Call our hotline right away so we can guide you through the next steps.",
  },
  {
    title: "Do you offer bulk pricing for businesses?",
    content:
      "Yes. We provide contract pricing for restaurants, property managers, and industrial clients. Share your monthly volume and location to receive a quote.",
  },
];

export default function SupportSection() {
  return (
    <section
      id="support"
      className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]"
    >
      <div className="space-y-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            FAQs
          </p>
          <h2 className="text-3xl font-semibold text-slate-900">
            Quick answers before you reach out
          </h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Accordion
              key={faq.title}
              title={faq.title}
              defaultOpen={index === 0}
            >
              <p>{faq.content}</p>
            </Accordion>
          ))}
        </div>
      </div>
      <SupportInquiryForm />
    </section>
  );
}
