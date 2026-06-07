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
    { href: "/fashion", label: "Fashion and Portraits" },
    { href: "/property", label: "Property" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const linkClass = (href: string) =>
    `transition ${
      router.pathname === href
        ? "text-black font-semibold border-b-2 border-black"
        : "text-gray-600 hover:text-black"
    }`;

  return (
    <div className="min-h-screen md:flex">
      {/* Left sidebar (desktop) / Top header (mobile) */}
      <div className="md:w-56 md:h-screen md:sticky md:top-0 md:border-r md:flex md:flex-col md:flex-shrink-0">

        {/* Logo row — also contains mobile burger */}
        <div className="flex items-center justify-between h-16 px-4 border-b md:border-b-0 md:h-auto md:px-6 md:pt-8 md:pb-8">
          <Link href="/" className="flex items-center space-x-2 font-bold text-lg">
            <img src="/scott-gobin-photography.png" alt="Logo" className="h-8 w-auto" />
            <span className="visually-hidden">Scott–Gobin Photography</span>
          </Link>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Desktop vertical nav */}
        <nav className="hidden md:flex md:flex-col md:px-6 md:space-y-4">
          {navItems.map(({ href, label }) => (
            <Link key={href} href={href} className={linkClass(href)}>
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile dropdown */}
        {menuOpen && (
          <nav className="md:hidden border-t bg-white">
            <div className="px-4 py-2 flex flex-col items-start space-y-2">
              {navItems.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`w-fit inline-flex ${linkClass(href)}`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>

      {/* Main content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
