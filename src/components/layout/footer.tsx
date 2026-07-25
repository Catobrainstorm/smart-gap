import { APP_NAME } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-slate-950">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-teal-400 to-teal-600 text-xs font-bold text-white">
            S
          </span>
          <span className="text-sm font-medium text-slate-300">{APP_NAME}</span>
        </div>
        <p className="text-sm text-slate-500">
          &copy; {year} {APP_NAME}. Built with Next.js &amp; Serwist.
        </p>
      </div>
    </footer>
  );
}
