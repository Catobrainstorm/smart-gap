import { FEATURES } from "@/lib/constants";
import type { Feature } from "@/types";

const iconMap: Record<Feature["icon"], React.ReactNode> = {
  device: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
    />
  ),
  offline: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M2.25 8.625c5.385-5.385 14.077-5.385 19.462 0"
    />
  ),
  speed: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
    />
  ),
  shield: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
    />
  ),
};

export function Features() {
  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Built for the modern web
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Everything you need for a production-grade PWA foundation, ready to
            extend with your product logic.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <article
              key={feature.title}
              className="group rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition hover:border-teal-500/20 hover:bg-white/[0.04]"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400 ring-1 ring-teal-500/20 transition group-hover:bg-teal-500/20">
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  {iconMap[feature.icon]}
                </svg>
              </div>
              <h3 className="text-base font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
