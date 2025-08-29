"use client";

import React, { useCallback } from 'react';
import RetroForm, { FieldConfig, FormType, FormData as RetroFormData } from './RetroForm';

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
  // Handle form submission
  const handleSubmit = useCallback((data: RetroFormData) => {
    console.log(`${formType.toUpperCase()} FORM DATA:`, data);
    // Add your submission logic here (e.g., API call)
  }, [formType]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 p-4">
      <RetroForm
        formType={formType}
        fields={fieldConfigs[formType]}
        onSubmit={handleSubmit}
        showOTP={formType === 'register'}
        title={formType === 'login' ? 'SIGN IN' : formType === 'register' ? 'REGISTER' : 'UPDATE PROFILE'}
        subtitle={
          formType === 'login'
            ? 'Welcome Back!'
            : formType === 'register'
            ? 'Join the Retro Club!'
            : 'Update Your Info!'
        }
        buttonText={formType === 'login' ? 'LOGIN' : 'SUBMIT'}
      />
    </div>
  );
};

export default RetroFormView;