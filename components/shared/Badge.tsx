interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'teal' | 'amber' | 'gray';
  className?: string;
}

export default function Badge({ children, variant = 'gray', className = "" }: BadgeProps) {
  const variants = {
    blue: 'bg-blue-50 text-blue-700',
    teal: 'bg-teal-50 text-teal-700',
    amber: 'bg-violet-50 text-amber-700',
    gray: 'bg-surface-light text-text-secondary border border-border',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-ui font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
