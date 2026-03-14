type PageIntroBodyProps = {
  heading: string;
  subheading: string;
};

export default function PageIntroBody({
  heading,
  subheading,
}: PageIntroBodyProps) {
  return (
    <section className="border-b border-gray-100 bg-white pt-24 pb-6 md:pt-28 md:pb-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
            {heading}
          </h1>
          <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-gray-600 md:mt-2 md:text-base">
            {subheading}
          </p>
        </div>
      </div>
    </section>
  );
}
