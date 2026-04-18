export default function TrustBar() {
  const stats = [
    { number: "2,000+", label: "Students Counselled" },
    { number: "500+", label: "Colleges Covered" },
    { number: "98%", label: "Satisfaction Rate" },
    { number: "5+", label: "Years of Expertise" }
  ];

  return (
    <section className="bg-brand-navy py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className={`text-center ${i !== stats.length - 1 ? 'md:border-r border-white/15' : ''}`}
            >
              <div className="text-white text-[36px] font-display leading-none mb-1">
                {stat.number}
              </div>
              <div className="text-white/60 font-ui text-[14px]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
