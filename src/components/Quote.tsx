type QuoteProps = {
  quote: string;
};

export default function Quote({ quote }: QuoteProps) {
  return (
    <blockquote className="text-sm md:text-base font-medium text-gray-700 italic leading-tight whitespace-nowrap overflow-hidden">
      &ldquo;{quote}&rdquo;
    </blockquote>
  );
}
