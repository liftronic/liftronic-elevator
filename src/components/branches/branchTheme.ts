export type BranchSurface = "soft" | "white" | "charcoal";

const surfaceClasses: Record<BranchSurface, string> = {
  soft: "bg-soft text-charcoal",
  white: "bg-white text-charcoal",
  charcoal: "bg-charcoal text-white",
};

export const branchTheme = {
  container: "container mx-auto px-4 md:px-6",
  section: "py-16 md:py-24",
  sectionCompact: "py-14 md:py-20",
  eyebrow:
    "inline-flex items-center rounded-full border border-brand/30 bg-brand/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand",
  displayTitle:
    "text-4xl md:text-6xl leading-[1.05] tracking-tight",
  sectionTitle:
    "text-3xl md:text-5xl leading-[1.1] tracking-tight",
  subsectionTitle: "text-2xl md:text-3xl leading-tight tracking-tight",
  bodyLarge: "text-lg md:text-xl leading-relaxed text-gray-600",
  body: "text-base leading-relaxed text-gray-600",
  card:
    "rounded-2xl border border-black/10 bg-white shadow-[0_20px_45px_-30px_rgba(17,24,39,0.45)]",
};

export const branchSectionClasses = (surface: BranchSurface = "soft") =>
  `${branchTheme.section} ${surfaceClasses[surface]}`;
