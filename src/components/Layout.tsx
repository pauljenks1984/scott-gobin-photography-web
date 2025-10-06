import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Menu, X } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/commercial", label: "Commercial" },
    { href: "/fashion", label: "Fashion" },
    { href: "/property", label: "Property" },
    { href: "/wedding", label: "Wedding" },
    { href: "/about", label: "About" },
  ];

  // Auto-close the mobile menu when resizing up to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-8xl mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 font-bold text-lg">
            <img src="/scott-gobin-photography.png" alt="Logo" className="h-8 w-auto" />
            <span className="visually-hidden">Scott–Gobin Photography</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`transition ${
                  router.pathname === href
                    ? "text-black font-semibold border-b-2 border-black"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Mobile Burger */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu (stacked, not overlay) */}
        {menuOpen && (
          <nav className="md:hidden border-t bg-white">
            <div className="max-w-8xl mx-auto px-4 py-2 flex flex-col items-start space-y-2">
              {navItems.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`transition w-fit inline-flex ${
                    router.pathname === href
                      ? "text-black font-semibold border-b-2 border-black"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* Main content */}
      <main className="flex-grow">{children}</main>
    </div>
  );
}
