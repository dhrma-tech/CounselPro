"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Check, X } from 'lucide-react';

export const SearchableSelect = ({ label, options, value, onChange, placeholder = "Select option", required, error }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((opt: string) => 
    opt.toLowerCase().includes(search.toLowerCase())
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

  return (
    <div className="flex flex-col gap-1 w-full relative" ref={containerRef}>
      <label className="font-ui font-medium text-[13px] text-text-secondary">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`
          h-11 bg-surface-light border rounded-lg px-4 flex items-center justify-between cursor-pointer transition-all duration-200
          ${isOpen ? 'border-brand-blue ring-4 ring-brand-blue/5' : 'border-border'}
          ${error ? 'border-red-500' : ''}
        `}
      >
        <span className={`text-[14px] ${value ? 'text-text-primary' : 'text-text-muted'}`}>
          {value || placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] left-0 w-full z-[100] bg-white border border-border shadow-xl rounded-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div className="p-2 border-b border-border bg-surface-light flex items-center gap-2">
            <Search className="w-4 h-4 text-text-muted ml-2" />
            <input
              autoFocus
              className="w-full bg-transparent border-none outline-none text-[14px] py-1"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="max-height-[240px] overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option: string) => (
                <div
                  key={option}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                    setSearch('');
                  }}
                  className="px-4 py-2.5 hover:bg-surface-light cursor-pointer text-[14px] flex items-center justify-between group"
                >
                  <span className={value === option ? "text-brand-blue font-semibold" : "text-text-primary"}>
                    {option}
                  </span>
                  {value === option && <Check className="w-4 h-4 text-brand-blue" />}
                </div>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-text-muted text-[13px]">
                No results found
              </div>
            )}
          </div>
        </div>
      )}
      
      {error && <p className="text-[12px] text-red-500 mt-0.5">{error}</p>}
    </div>
  );
};
