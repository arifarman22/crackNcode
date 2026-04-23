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
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-500/20 mb-4">
          {tag}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-4">{title}</h2>
      {description && (
        <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">{description}</p>
      )}
    </AnimatedSection>
  );
}
