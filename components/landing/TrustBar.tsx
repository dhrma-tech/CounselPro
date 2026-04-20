export default function TrustBar() {
  const stats = [
    { number: "10,000+", label: "Students Counselled" },
    { number: "500+", label: "Colleges Covered" },
    { number: "98%", label: "Satisfaction Rate" },
    { number: "4+", label: "Years of Experience" }
  ];

  return (
    <section className="bg-brand-navy py-10 px-5 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 md:gap-0">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`text-center py-2 ${i !== stats.length - 1 ? 'md:border-r border-white/10' : ''}`}
            >
              <div className="text-white text-[28px] sm:text-[36px] font-display leading-none mb-1.5">
                {stat.number}
              </div>
              <div className="text-white/50 font-ui text-[12px] sm:text-[14px] uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
