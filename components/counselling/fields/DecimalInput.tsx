"use client";

import React from 'react';
import { TextInput } from './TextInput';

export const DecimalInput = ({ label, ...props }: any) => {
  return (
    <TextInput
      label={label}
      type="number"
      step="0.01"
      min="0"
      max="100"
      {...props}
    />
  );
};
