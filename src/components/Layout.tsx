import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Menu, X, ChevronUp } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const router = useRouter();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/commercial", label: "Commercial" },
    { href: "/fashion", label: "Fashion" },
    { href: "/about", label: "About" },
  ];

  useEffect(() => {
    const onScroll = () => setShowButton(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b mb-8">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 font-bold text-lg">
            <img src="/scott-gobin-photography.png" alt="Logo" className="h-8 w-auto" />
            <span className="visually-hidden">Scott–Gobin Photography</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map(({ href, label }) => {
              const active = router.pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`transition ${
                    active
                      ? // Desktop: border underline
                        "text-black font-semibold md:border-b-2 md:border-black md:pb-[2px]"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  {/* Mobile: text underline only (fits text width) */}
                  <span
                    className={`md:no-underline ${
                      active ? "underline decoration-2 decoration-black underline-offset-4" : ""
                    }`}
                  >
                    {label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Burger */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu (stacked) */}
        {menuOpen && (
          <nav className="md:hidden border-t bg-white">
            <div className="max-w-6xl mx-auto px-4 py-2 flex flex-col space-y-2">
              {navItems.map(({ href, label }) => {
                const active = router.pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`transition w-fit ${
                      active ? "text-black font-semibold" : "text-gray-600 hover:text-black"
                    }`}
                  >
                    {/* Mobile: text underline */}
                    <span className={active ? "underline decoration-2 decoration-black underline-offset-4" : ""}>
                      {label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
      </header>

      {/* Main content */}
      <main className="flex-grow">{children}</main>

      {/* Back to Top */}
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-black text-white shadow-md hover:bg-gray-800 transition"
          aria-label="Back to top"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
