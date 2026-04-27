"use client";

import React from 'react';
import { useApplicationStore } from '@/store/applicationStore';
import { TextInput } from '../fields/TextInput';
import { PhoneInput } from '../fields/PhoneInput';
import { StepProgress } from '../StepProgress';
import { StepFooter } from '../StepFooter';

export const GlobalStep = () => {
  const { formData, updateField, nextStep } = useApplicationStore();
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleNext = () => {
    const newErrors: Record<string, string> = {};
    
    // Robust validation
    const nameWords = (formData.candidateName || '').trim().split(/\s+/).filter(Boolean).length;
    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.candidateName || nameWords < 3) {
      newErrors.candidateName = "Please enter your full legal name (at least 3 words)";
    }
    
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      newErrors.phone = "A valid 10-digit mobile number is required";
    }

    if (!formData.whatsappNumber || !phoneRegex.test(formData.whatsappNumber)) {
      newErrors.whatsappNumber = "A valid 10-digit WhatsApp number is required";
    }

    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Please provide a valid email address for communication";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll to top of form if needed, or just let them see the red borders
      return;
    }

    setErrors({});
    nextStep();
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <StepProgress currentTitle="Contact Information" />
      
      <div className="space-y-4">
        <TextInput
          label="Full Name"
          placeholder="Enter your full name"
          required
          value={formData.candidateName || ''}
          error={errors.candidateName}
          onChange={(e) => {
            updateField('candidateName', e.target.value);
            if (errors.candidateName) setErrors(prev => ({ ...prev, candidateName: '' }));
          }}
        />

        <PhoneInput
          label="Mobile Number"
          placeholder="10-digit mobile number"
          required
          value={formData.phone || ''}
          error={errors.phone}
          onChange={(e: any) => {
            const val = e.target.value;
            updateField('phone', val);
            if (formData.isWhatsappSameAsMobile) {
              updateField('whatsappNumber', val);
            }
            if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
          }}
        />

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="font-ui font-medium text-[13px] text-text-secondary">
              WhatsApp Number <span className="text-red-500 ml-0.5">*</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={formData.isWhatsappSameAsMobile || false}
                onChange={(e) => {
                  const checked = e.target.checked;
                  updateField('isWhatsappSameAsMobile', checked);
                  if (checked) {
                    updateField('whatsappNumber', formData.phone || '');
                    if (errors.whatsappNumber) setErrors(prev => ({ ...prev, whatsappNumber: '' }));
                  }
                }}
                className="w-3.5 h-3.5 rounded border-border text-brand-blue focus:ring-brand-blue/20"
              />
              <span className="text-[11px] font-medium text-text-muted group-hover:text-brand-blue transition-colors">Same as Mobile</span>
            </label>
          </div>
          <PhoneInput
            placeholder="10-digit WhatsApp number"
            required
            value={formData.whatsappNumber || ''}
            error={errors.whatsappNumber}
            disabled={formData.isWhatsappSameAsMobile}
            onChange={(e: any) => {
              updateField('whatsappNumber', e.target.value);
              if (errors.whatsappNumber) setErrors(prev => ({ ...prev, whatsappNumber: '' }));
            }}
            className={formData.isWhatsappSameAsMobile ? 'opacity-60 grayscale-[0.5]' : ''}
          />
        </div>

        <TextInput
          label="Email Address"
          type="email"
          placeholder="your@email.com"
          required
          value={formData.email || ''}
          error={errors.email}
          onChange={(e) => {
            updateField('email', e.target.value);
            if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
          }}
        />

        <TextInput
          label="Referral Code"
          sublabel="Enter your teacher's or counsellor's referral code (optional)"
          placeholder="e.g. CPT-ARJUN22"
          className="uppercase"
          value={formData.referralCode || ''}
          onChange={(e) => updateField('referralCode', e.target.value.toUpperCase())}
        />
      </div>

      <div className="mt-8">
        <StepFooter onNext={handleNext} />
      </div>
    </div>
  );
};
