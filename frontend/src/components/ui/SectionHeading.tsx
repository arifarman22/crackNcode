import AnimatedSection from "./AnimatedSection";

interface Props {
  tag?: string;
  title: string;
  description?: string;
}

export default function SectionHeading({ tag, title, description }: Props) {
  return (
    <AnimatedSection className="text-center mb-12 sm:mb-16">
      {tag && (
        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-4">
          {tag}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4">{title}</h2>
      {description && (
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">{description}</p>
      )}
    </AnimatedSection>
  );
}
