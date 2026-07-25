import Link from "next/link";
import { APP_NAME, NAV_LINKS } from "@/lib/constants";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 text-sm font-bold text-white shadow-lg shadow-teal-500/20">
            S
          </span>
          <span className="text-lg font-semibold tracking-tight text-white">
            {APP_NAME}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-slate-400 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="#cta"
          className="rounded-full bg-teal-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-400"
        >
          Get started
        </Link>
      </div>
    </header>
  );
}
