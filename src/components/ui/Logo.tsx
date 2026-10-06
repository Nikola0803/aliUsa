import Link from "next/link";

/**
 * Temporary ALI USA wordmark. Replace this component with the final vector
 * brand asset when it is supplied; keeping it as live type makes this first
 * design spin-off deployable without reusing ALI USA's protected logo artwork.
 */
export function Logo({
  tone = "ivory",
  className = "",
  imgClassName = "h-6 w-auto md:h-7",
}: {
  tone?: "ivory" | "charcoal";
  className?: string;
  imgClassName?: string;
}) {
  return (
    <Link href="/" className={`inline-flex shrink-0 items-center ${className}`}>
      <span className={`${imgClassName} inline-flex h-auto items-center gap-2 whitespace-nowrap font-display text-[1.35rem] font-semibold tracking-[.14em] ${tone === "ivory" ? "text-white" : "text-[#3f2a3a]"}`}>
        ALI <span className="font-body text-[.62em] font-medium tracking-[.24em] opacity-70">USA</span>
      </span>
    </Link>
  );
}
