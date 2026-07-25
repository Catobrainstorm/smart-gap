import { Button } from "@/components/ui/button";

export function Cta() {
  return (
    <section id="cta" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl border border-teal-500/20 bg-gradient-to-br from-teal-500/10 via-slate-900 to-slate-950 px-8 py-16 text-center sm:px-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-teal-500/20 blur-3xl"
          />

          <h2 className="relative text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to close the gap?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-lg text-slate-400">
            Your SmartGap foundation is configured with PWA manifest, service
            worker, and a clean component architecture. Start building your
            product today.
          </p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="#features">View features</Button>
            <Button href="/" variant="secondary">
              Install on device
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
