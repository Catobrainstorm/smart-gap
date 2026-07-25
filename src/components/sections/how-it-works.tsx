import { STEPS } from "@/lib/constants";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-y border-white/5 bg-white/[0.02] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Up and running in minutes
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            SmartGap is designed to be installed and used immediately — no app
            store required.
          </p>
        </div>

        <ol className="mt-16 grid gap-8 md:grid-cols-3">
          {STEPS.map((item) => (
            <li key={item.step} className="relative">
              <span className="text-5xl font-bold text-teal-500/20">
                {item.step}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
