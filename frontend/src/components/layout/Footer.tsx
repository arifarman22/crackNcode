import Link from "next/link";

const footerLinks = {
  Product: [
    { label: "Services", href: "/services" },
    { label: "Shop", href: "/shop" },
    { label: "Academy", href: "/academy" },
    { label: "Premium", href: "/premium" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Refund Policy", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-xl font-bold gradient-text">
              CrackNCode
            </Link>
            <p className="mt-3 text-sm text-gray-400">
              Building digital excellence. Your partner in growth, design, and technology.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold mb-3 text-sm">{title}</h4>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} CrackNCode. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
