const footerLinks = [
  { label: "Delivery Coverage", href: "#support" },
  { label: "Safety Tips", href: "#support" },
  { label: "Partner with Us", href: "#support" },
  { label: "Contact", href: "#support" },
];

export default function GeneralFooterLayout() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold">LPG Store</p>
          <p className="text-sm text-slate-400">
            Reliable refills, accessories, and safety checks delivered to your doorstep.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-slate-300">
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
      <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        © {currentYear} LPG Store. Built for safe, convenient energy access.
      </div>
    </footer>
  );
}
