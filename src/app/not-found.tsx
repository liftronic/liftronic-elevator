import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-soft to-soft" />
      <div className="absolute inset-0 -z-10 opacity-70 [background:radial-gradient(75%_60%_at_25%_20%,rgba(42,227,148,0.22),transparent_70%)]" />
      <div className="absolute right-[-12%] top-20 -z-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />

      <section className="container mx-auto px-4 py-24 md:py-32">
        <div className="grid items-center gap-16 md:grid-cols-[1.1fr_1fr]">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-white/70 px-4 py-1 text-sm font-semibold text-accent shadow-sm backdrop-blur">
              <span className="size-2 rounded-full bg-accent" />
              404 — Level Unreachable
            </span>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              Looks like this floor doesn&apos;t exist yet.
            </h1>
            <p className="max-w-xl text-base text-charcoal/70 sm:text-lg">
              The page you are looking for might have been moved, renamed, or is
              temporarily unavailable. Let us guide you back to the experiences
              we&apos;ve already perfected.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/" className="btn btn-primary">
                Back to home
              </Link>
              <Link
                href="/#contact"
                className="btn border-accent/40 bg-white/80 text-charcoal shadow-sm hover:border-accent/60 hover:bg-white"
              >
                Talk to our team
              </Link>
            </div>
          </div>

          <div className="relative mx-auto max-w-[380px]">
            <div className="absolute inset-10 -z-10 rounded-[32px] bg-gradient-to-br from-accent/30 via-accent/10 to-transparent blur-2xl" aria-hidden="true" />
            <div className="rounded-[28px] border border-white/40 bg-white/80 p-6 shadow-elevate backdrop-blur">
              <Image
                src="/illustrations/404-elevator.svg"
                alt="Stylized elevator illustration"
                width={360}
                height={360}
                priority
              />
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-8 rounded-2xl border border-accent/20 bg-white/70 p-6 shadow-sm backdrop-blur md:grid-cols-3">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.25em] text-charcoal/40">Contact</p>
            <p className="font-semibold text-charcoal">+91-00000-00000</p>
            <p className="text-sm text-charcoal/60">Call us for elevator consultations</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.25em] text-charcoal/40">Email</p>
            <p className="font-semibold text-charcoal">info@example.com</p>
            <p className="text-sm text-charcoal/60">We respond within one business day</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.25em] text-charcoal/40">Explore</p>
            <Link href="/products" className="text-sm font-semibold text-accent hover:text-accent/80">
              View our product range
            </Link>
            <p className="text-sm text-charcoal/60">Discover cabins, controllers, and modernization kits</p>
          </div>
        </div>
      </section>
    </main>
  );
}
