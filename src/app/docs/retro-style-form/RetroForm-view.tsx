"use client";

import React from 'react';
import RetroForm, { FieldConfig, FormType } from './RetroForm';

const fieldConfigs: Record<FormType, FieldConfig[]> = {
  register: [
    { name: 'username', type: 'text', label: 'USERNAME', icon: 'user', required: true, section: 'BASIC INFO' },
    { name: 'email', type: 'email', label: 'EMAIL', icon: 'mail', required: true },
    { name: 'phoneNumber', type: 'tel', label: 'PHONE NUMBER', icon: 'phone', section: 'CONTACT INFO' },
    { name: 'password', type: 'password', label: 'PASSWORD', icon: 'lock', required: true, section: 'SECURITY' },
    { name: 'confirmPassword', type: 'password', label: 'CONFIRM PASSWORD', icon: 'lock', required: true },
    {
      name: 'gender',
      type: 'select',
      label: 'GENDER',
      icon: 'user',
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
      ],
    },
  ],
  profile: [
    { name: 'username', type: 'text', label: 'USERNAME', icon: 'user', required: true, section: 'BASIC INFO' },
    { name: 'email', type: 'email', label: 'EMAIL', icon: 'mail', required: true },
    { name: 'phoneNumber', type: 'tel', label: 'PHONE NUMBER', icon: 'phone', section: 'CONTACT INFO' },
    { name: 'birthDate', type: 'date', label: 'BIRTH DATE', icon: 'calendar' },
  ],
  login: [
    { name: 'email', type: 'email', label: 'EMAIL', icon: 'mail', required: true },
    { name: 'password', type: 'password', label: 'PASSWORD', icon: 'lock', required: true },
  ],
};

interface RetroFormViewProps {
  formType: FormType;
}

const RetroFormView: React.FC<RetroFormViewProps> = ({ formType }) => {
  const handleSubmit = (data: Record<string, any>) => {
    console.log(`${formType.toUpperCase()} Form Data:`, data);
    alert(`${formType.toUpperCase()} form submitted! Check console.`);
  };

  return (
    <RetroForm
      formType={formType}
      fields={fieldConfigs[formType]}
      onSubmit={handleSubmit}
      showOTP={formType === 'register'}
    />
  );
};

export default RetroFormView;