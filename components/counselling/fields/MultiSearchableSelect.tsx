"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Check, Star } from 'lucide-react';

export const MultiSearchableSelect = ({ 
  label, 
  sublabel, 
  options, 
  value = [], 
  onChange, 
  required, 
  error,
  placeholder = "Search and add branches...",
  recommendations = []
}: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((opt: string) => 
    opt.toLowerCase().includes(search.toLowerCase()) && !value.includes(opt)
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (option: string) => {
    const newValue = value.includes(option)
      ? value.filter((v: string) => v !== option)
      : [...value, option];
    onChange(newValue);
    setSearch('');
  };

  return (
    <div className="flex flex-col gap-3 w-full" ref={containerRef}>
      <div className="flex flex-col gap-0.5">
        <label className="font-ui font-semibold text-[14px] text-text-primary">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        {sublabel && <p className="text-[12px] text-text-muted leading-relaxed">{sublabel}</p>}
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
            <Star className="w-3 h-3 text-brand-blue" /> Recommended Branches
          </p>
          <div className="flex flex-wrap gap-2">
            {recommendations.map((rec: string) => {
              const isSelected = value.includes(rec);
              return (
                <button
                  key={rec}
                  type="button"
                  onClick={() => toggleOption(rec)}
                  className={`
                    px-3 py-1.5 rounded-lg border text-[12px] font-medium transition-all
                    ${isSelected 
                      ? 'bg-brand-blue border-brand-blue text-white shadow-sm' 
                      : 'bg-white border-border text-text-secondary hover:border-brand-blue/40'}
                  `}
                >
                  {rec}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected Items Chips */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-1">
          {value.map((item: string) => (
            <div 
              key={item}
              className="flex items-center gap-1.5 bg-brand-blue/10 border border-brand-blue/20 text-brand-blue px-3 py-1.5 rounded-xl animate-in zoom-in-95 duration-200"
            >
              <span className="text-[13px] font-semibold">{item}</span>
              <button 
                type="button"
                onClick={() => toggleOption(item)}
                className="hover:bg-brand-blue/20 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Search Input */}
      <div className="relative">
        <div 
          className={`
            h-12 bg-surface-light border rounded-xl px-4 flex items-center gap-3 transition-all duration-200
            ${isOpen ? 'border-brand-blue ring-4 ring-brand-blue/5' : 'border-border'}
            ${error ? 'border-red-500' : ''}
          `}
        >
          <Search className="w-4 h-4 text-text-muted" />
          <input
            type="text"
            className="w-full bg-transparent border-none outline-none text-[15px] placeholder:text-text-muted"
            placeholder={placeholder}
            value={search}
            onFocus={() => setIsOpen(true)}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {isOpen && (search.length > 0 || filteredOptions.length > 0) && (
          <div className="absolute top-[calc(100%+6px)] left-0 w-full z-[100] bg-white border border-border shadow-2xl rounded-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="max-h-[280px] overflow-y-auto p-1.5">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option: string) => (
                  <div
                    key={option}
                    onClick={() => {
                      toggleOption(option);
                      setIsOpen(false);
                    }}
                    className="px-4 py-3 hover:bg-surface-light cursor-pointer rounded-xl text-[14px] flex items-center justify-between group transition-colors"
                  >
                    <span className="text-text-primary group-hover:text-brand-blue font-medium">{option}</span>
                    <Check className="w-4 h-4 text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-text-muted text-[13px]">
                  No matching branches found
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {error && <p className="text-[12px] text-red-500 font-medium ml-1">{error}</p>}
    </div>
  );
};
