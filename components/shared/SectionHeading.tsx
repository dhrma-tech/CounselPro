interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeading({ title, subtitle, centered = false, className = "" }: SectionHeadingProps) {
  return (
    <div className={`${centered ? "text-center" : "text-left"} mb-12 ${className}`}>
      <h2 className="heading-lg mb-4">{title}</h2>
      {subtitle && <p className="body-lg max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}
