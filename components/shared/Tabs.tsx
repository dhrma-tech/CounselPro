"use client";

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export default function Tabs({ tabs, activeTab, onChange, className = "" }: TabsProps) {
  return (
    <div className={`flex border-b border-border mb-8 overflow-x-auto hide-scrollbar ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-8 py-4 text-[16px] font-ui font-semibold transition-colors border-b-2 whitespace-nowrap ${
            activeTab === tab.id
              ? "border-brand-blue text-brand-blue"
              : "border-transparent text-text-muted hover:text-text-primary"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
