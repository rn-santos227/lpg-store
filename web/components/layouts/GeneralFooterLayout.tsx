const footerLinks = [
  { label: "Delivery Coverage", href: "/support#coverage" },
  { label: "Safety Tips", href: "/support#safety" },
  { label: "Partner with Us", href: "/support#partners" },
  { label: "Contact", href: "/support#contact" },
];

export default function GeneralFooterLayout() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-red-100 bg-red-900 text-amber-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold">A4R LPG Trading</p>
          <p className="text-sm text-red-200">
            Reliable refills, accessories, and safety checks delivered to your doorstep.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-red-100">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-red-400 py-4 text-center text-xs text-red-100">
        © {currentYear} A4R LPG Trading. Built for safe, convenient energy access.
      </div>
    </footer>
  );
}
