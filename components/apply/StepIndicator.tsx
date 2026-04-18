export default function StepIndicator({ currentStep }: { currentStep: number }) {
  const steps = [
    { num: 1, label: "Counselling" },
    { num: 2, label: "Personal" },
    { num: 3, label: "Exam Details" },
    { num: 4, label: "Preferences" },
    { num: 5, label: "Review" },
  ];

  return (
    <div className="relative flex items-center justify-between w-full max-w-md mx-auto">
      <div className="absolute top-4 left-4 right-4 h-[2px] bg-surface-light -z-10">
        <div 
          className="h-full bg-brand-blue transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />
      </div>

      {steps.map((s, i) => {
        const isActive = s.num === currentStep;
        const isCompleted = s.num < currentStep;
        
        return (
          <div key={s.num} className="flex flex-col items-center">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-colors duration-300
                ${isActive ? 'bg-brand-blue border-brand-blue text-white' : 
                  isCompleted ? 'bg-brand-navy border-brand-navy text-white' : 
                  'bg-surface-light border-border text-text-muted'}
              `}
            >
              {isCompleted ? "✓" : s.num}
            </div>
            <span className={`text-[11px] font-medium mt-2 absolute top-10 w-20 text-center uppercase tracking-wider
              ${isActive ? 'text-brand-blue' : isCompleted ? 'text-brand-navy' : 'text-text-muted'}
            `}>
              {s.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
