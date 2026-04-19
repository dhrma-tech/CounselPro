"use client";

import React from 'react';
import { useApplicationStore } from '@/store/applicationStore';
import { TextInput } from '../fields/TextInput';
import { PhoneInput } from '../fields/PhoneInput';
import { StepProgress } from '../StepProgress';
import { StepFooter } from '../StepFooter';

export const GlobalStep = () => {
  const { formData, updateField, nextStep } = useApplicationStore();

  const handleNext = () => {
    // Simple validation
    if (!formData.candidateName || !formData.phone || !formData.email) {
      alert("Please fill all required fields");
      return;
    }
    nextStep();
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <StepProgress currentTitle="Contact Information" />
      
      <div className="space-y-2.5">
        <TextInput
          label="Full Name"
          placeholder="Enter your full name"
          required
          value={formData.candidateName || ''}
          onChange={(e) => updateField('candidateName', e.target.value)}
        />

        <PhoneInput
          label="Mobile Number"
          placeholder="10-digit mobile number"
          required
          value={formData.phone || ''}
          onChange={(e: any) => updateField('phone', e.target.value)}
        />

        <TextInput
          label="Email Address"
          type="email"
          placeholder="your@email.com"
          required
          value={formData.email || ''}
          onChange={(e) => updateField('email', e.target.value)}
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

      <StepFooter onNext={handleNext} />
    </div>
  );
};
