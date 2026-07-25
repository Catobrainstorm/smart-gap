import Link from "next/link";

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-500/10 ring-1 ring-teal-500/30">
        <svg
          aria-hidden="true"
          className="h-8 w-8 text-teal-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M2.25 8.625c5.385-5.385 14.077-5.385 19.462 0"
          />
        </svg>
      </div>
      <h1 className="text-2xl font-semibold tracking-tight text-white">
        You&apos;re offline
      </h1>
      <p className="mt-3 max-w-sm text-slate-400">
        SmartGap couldn&apos;t reach the network. Reconnect and try again, or
        return to a cached page.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-full bg-teal-500 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-teal-400"
      >
        Try again
      </Link>
    </div>
  );
}
