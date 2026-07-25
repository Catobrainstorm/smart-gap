import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-500/20 via-slate-950 to-slate-950"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-teal-500/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/10 px-4 py-1.5 text-sm text-teal-300">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
          Progressive Web App · Offline ready
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl sm:leading-[1.1]">
          Bridge the gap between{" "}
          <span className="bg-gradient-to-r from-teal-300 to-teal-500 bg-clip-text text-transparent">
            insight and action
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
          SmartGap is a modern, installable web app that keeps you productive
          on the go. Fast, reliable, and ready to work — even when you&apos;re
          offline.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="#cta">Start building</Button>
          <Button href="#features" variant="secondary">
            Explore features
          </Button>
        </div>
      </div>
    </section>
  );
}
