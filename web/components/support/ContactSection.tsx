import type { Contact } from "../../@types/contact";

type ContactSectionProps = {
  contact: Contact;
};

export default function ContactSection({ contact }: ContactSectionProps) {
  const contactCards = [
    {
      title: "Service address",
      detail: contact.address,
      helper: "Visit us for refills, cylinder checks, and safety support.",
    },
    {
      title: "Contact numbers",
      detail: (
        <ul className="space-y-1">
          {contact.contactNumbers.map((item) => (
            <li key={`${item.label}-${item.number}`} className="text-base font-semibold text-amber-700">
              <span className="text-slate-600">{item.label}:</span> {item.number}
            </li>
          ))}
        </ul>
      ),
      helper: "Multiple lines are available for urgent support and deliveries.",
    },
    {
      title: "Email support",
      detail: contact.email,
      helper: "Non-urgent questions and documentation requests.",
    },
    {
      title: "Operating hours",
      detail: contact.operationsHours
        .map((item) => `${item.label}: ${item.hours}`)
        .join(" • "),
      helper: "Response times may vary on holidays.",
    },
    {
      title: "Social media",
      detail: (
        <ul className="space-y-1">
          {contact.socialMedia.map((item) => (
            <li key={`${item.platform}-${item.url}`}>
              <a
                className="text-base font-semibold text-amber-700 hover:text-amber-600"
                href={item.url}
                target="_blank"
                rel="noreferrer"
              >
                {item.platform}
              </a>
            </li>
          ))}
        </ul>
      ),
      helper: "Follow us for promos, delivery updates, and safety tips.",
    },
  ];

  return (
    <section
      id="contact"
      className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {contactCards.map((card) => (
          <div
            key={card.title}
            className="rounded-3xl border border-amber-100 bg-white p-6 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-slate-900">{card.title}</h2>
            <div className="mt-2 text-xl font-semibold text-amber-700">
              {card.detail}
            </div>
            <p className="mt-1 text-sm text-slate-500">{card.helper}</p>
          </div>
        ))}
      </div>
      <div className="rounded-3xl border border-amber-100 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between gap-3 px-2 pb-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Map
            </p>
            <p className="text-lg font-semibold text-slate-900">
              Find our location
            </p>
          </div>
          {contact.mapLink ? (
            <a
              className="text-sm font-semibold text-amber-700 transition hover:text-amber-600"
              href={contact.mapLink}
              target="_blank"
              rel="noreferrer"
            >
              Open in Google Maps
            </a>
          ) : null}
        </div>
        {contact.mapEmbedUrl ? (
          <iframe
            title="LPG store map"
            src={contact.mapEmbedUrl}
            className="h-72 w-full rounded-2xl border border-slate-200"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div className="flex h-72 items-center justify-center rounded-2xl border border-dashed border-slate-200 text-sm text-slate-500">
            Map details are being updated.
          </div>
        )}
      </div>
    </section>
  );
}
