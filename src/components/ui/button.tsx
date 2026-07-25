import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  children: React.ReactNode;
};

const variants = {
  primary:
    "bg-teal-500 text-white hover:bg-teal-400 shadow-lg shadow-teal-500/25",
  secondary:
    "border border-white/10 bg-white/5 text-white hover:bg-white/10",
  ghost: "text-slate-300 hover:text-white hover:bg-white/5",
};

export function Button({
  href,
  variant = "primary",
  className,
  children,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium transition",
    variants[variant],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <button type="button" className={classes}>{children}</button>;
}
