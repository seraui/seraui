"use client";

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { User, Mail, Lock, Phone, Calendar, MapPin, Eye, EyeOff } from 'lucide-react';

// Type Definitions
export type FormType = 'register' | 'profile' | 'login';
export type FieldType = 'text' | 'email' | 'password' | 'tel' | 'date' | 'select';
export interface FieldOption {
  value: string;
  label: string;
}
export type IconType = 'user' | 'mail' | 'lock' | 'phone' | 'calendar' | 'mapPin' | React.ElementType;
export interface FieldConfig {
  name: string;
  type?: FieldType;
  label: string;
  placeholder?: string;
  icon?: IconType;
  options?: FieldOption[];
  required?: boolean;
  section?: string;
}
type FormData = { [key: string]: string };
interface RetroFormProps {
  formType: FormType;
  fields: FieldConfig[];
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onSubmit: (data: FormData) => void;
  showOTP?: boolean;
}

// Constants & Helpers
const iconMap: Record<string, React.ElementType> = {
  user: User, mail: Mail, lock: Lock, phone: Phone, calendar: Calendar, mapPin: MapPin,
};

const theme = {
  primary: 'bg-amber-400',
  accent: 'bg-pink-400',
  success: 'bg-emerald-400',
  error: 'bg-rose-400',
  base: 'bg-gray-100',
};

const retroShadow = 'shadow-[6px_6px_0_#000]';
const inputBaseClasses = 'flex-1 w-full outline-none p-3 text-base bg-transparent text-gray-900 font-semibold tracking-wide';
const buttonBaseClasses = `border-4 border-gray-900 px-6 py-3 text-xl font-bold text-gray-900 transition-all duration-300 hover:scale-105 active:scale-95 ${retroShadow}`;

// Sub-Component: RetroInput
interface RetroInputProps {
  field: FieldConfig;
  value: string;
  error?: string;
  isSuccess?: boolean;
  showPassword?: boolean;
  showOtpButton?: boolean;
  onChange: (name: string, value: string) => void;
  onBlur: (name: string, value: string) => void;
  onToggleShowPassword?: (name: string) => void;
  onSendOTP?: () => void;
}

const RetroInput: React.FC<RetroInputProps> = ({
  field,
  value,
  error,
  isSuccess,
  showPassword,
  showOtpButton,
  onChange,
  onBlur,
  onToggleShowPassword,
  onSendOTP,
}) => {
  const { name, type = 'text', placeholder = `Enter ${field.label.toLowerCase()}`, icon = 'user', label, options, required } = field;
  const Icon = typeof icon === 'string' ? (iconMap[icon] || User) : icon;
  const inputId = `retro-input-${name}`;
  const messageId = `retro-message-${name}`;
  const inputRef = useRef<HTMLInputElement | HTMLSelectElement | null>(null);

  const getBorderColor = () => {
    if (error) return 'border-rose-500';
    if (isSuccess) return 'border-emerald-500';
    return 'border-gray-900';
  };

  const getLabelColor = () => {
    if (error) return theme.error;
    if (isSuccess) return theme.success;
    return theme.primary;
  };

  return (
    <div className="relative mb-4">
      <div className={`relative flex items-center border-4 ${theme.base} ${getBorderColor()} ${retroShadow} rounded-lg transition-all duration-300 focus-within:scale-105 focus-within:border-amber-500 focus-within:shadow-[6px_6px_0_#f59e0b]`}>
        <button
          type="button"
          className="p-3 border-r-4 border-gray-900 flex justify-center items-center hover:bg-amber-300 transition-colors duration-200"
          onClick={() => inputRef.current?.focus()}
          aria-label={`Focus on ${label} field`}
        >
          <Icon size={20} className="text-gray-900" />
        </button>
        <div className="relative flex-1">
          <span className={`absolute -top-3 left-3 text-gray-900 font-bold px-2 py-0.5 text-xs border-2 border-gray-900 rounded-sm uppercase tracking-wider ${getLabelColor()} transition-colors duration-200`}>
            {label} {required ? '*' : ''}
          </span>
          {type === 'select' ? (
            <select
              ref={inputRef}
              id={inputId}
              name={name}
              value={value}
              onChange={(e) => onChange(name, e.target.value)}
              onBlur={(e) => onBlur(name, e.target.value)}
              className={`${inputBaseClasses} appearance-none rounded-r-lg`}
              aria-describedby={messageId}
              aria-required={required}
              required={required}
            >
              <option value="">{placeholder}</option>
              {options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              ref={inputRef}
              id={inputId}
              type={type === 'password' && showPassword ? 'text' : type}
              name={name}
              value={value}
              onChange={(e) => onChange(name, e.target.value)}
              onBlur={(e) => onBlur(name, e.target.value)}
              placeholder={placeholder}
              className={`${inputBaseClasses} rounded-r-lg`}
              aria-describedby={messageId}
              aria-required={required}
              required={required}
              autoComplete={
                type === 'email' ? 'email' :
                type === 'password' ? (name === 'confirmPassword' ? 'new-password' : 'current-password') :
                type === 'tel' ? 'tel' :
                name === 'firstName' ? 'given-name' :
                name === 'lastName' ? 'family-name' :
                'off'
              }
            />
          )}
        </div>
        {type === 'password' && onToggleShowPassword && (
          <button
            type="button"
            onClick={() => onToggleShowPassword(name)}
            className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
        {showOtpButton && onSendOTP && (
          <button
            type="button"
            onClick={onSendOTP}
            className="bg-amber-400 hover:bg-amber-300 border-l-4 border-gray-900 px-3 py-2 font-bold text-sm uppercase rounded-r-lg transition-all duration-200 hover:scale-105"
            aria-label="Send OTP"
          >
            SEND
          </button>
        )}
      </div>
      <div id={messageId} aria-live="polite" className="mt-1 text-sm font-semibold h-5">
        {error && <span className="text-rose-500 animate-pulse">{error}</span>}
        {isSuccess && !error && <span className="text-emerald-500">Looks good!</span>}
      </div>
    </div>
  );
};

// Main Component: RetroForm
const RetroForm: React.FC<RetroFormProps> = ({
  formType,
  fields,
  title = formType === 'login' ? 'SIGN IN' : formType === 'register' ? 'REGISTER' : 'UPDATE PROFILE',
  subtitle = formType === 'login' ? 'Welcome Back!' : formType === 'register' ? 'Join the Retro Club!' : 'Update Your Info!',
  buttonText = formType === 'login' ? 'LOGIN' : 'SUBMIT',
  onSubmit,
  showOTP = false,
}) => {
  const initialFormData = fields.reduce<FormData>((acc, field) => ({ ...acc, [field.name]: '' }), {});
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState<Record<string, boolean>>({});
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});
  const [otpSent, setOtpSent] = useState(false);

  const requiredFields = fields.filter(field => field.required).map(field => field.name);

  const validateField = useCallback((name: string, value: string) => {
    const fieldConfig = fields.find(f => f.name === name);
    if (!fieldConfig) return true;

    let error = '';
    const isRequired = requiredFields.includes(name);

    if (isRequired && !value.trim()) {
      error = `${fieldConfig.label} is required`;
    } else if (value) {
      switch (fieldConfig.type) {
        case 'email':
          if (!/\S+@\S+\.\S+/.test(value)) error = 'Invalid email format';
          break;
        case 'password':
          if (value.length < 8) error = 'Password must be at least 8 characters';
          break;
        case 'tel':
          if (!/^\+?1?\d{10,15}$/.test(value)) error = 'Invalid phone number';
          break;
      }
      if (fieldConfig.name === 'confirmPassword' && value !== formData.password) {
        error = 'Passwords do not match';
      }
    }

    setErrors(prev => ({ ...prev, [name]: error }));
    setSuccess(prev => ({ ...prev, [name]: !error && !!value.trim() }));
    return !error;
  }, [fields, requiredFields, formData.password]);

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
    setSuccess(prev => ({ ...prev, [name]: false }));
  };

  const handleInputBlur = (name: string, value: string) => {
    validateField(name, value);
  };

  const handleToggleShowPassword = (name: string) => {
    setShowPassword(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleSubmit = () => {
    let isValid = true;
    fields.forEach(field => {
      if (!validateField(field.name, formData[field.name])) {
        isValid = false;
      }
    });

    if (isValid) {
      onSubmit(formData);
      setFormData(initialFormData);
      setErrors({});
      setSuccess({});
      setOtpSent(false);
    }
  };

  const handleSendOTP = () => {
    if (validateField('phoneNumber', formData.phoneNumber)) {
      setOtpSent(true);
      console.log('OTP sent to:', formData.phoneNumber);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 p-4 sm:p-8 font-mono">
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
        .animate-pulse-slow {
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-3px); }
          75% { transform: translateX(3px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className={`inline-block text-3xl sm:text-4xl font-bold text-gray-900 bg-amber-400 px-6 py-3 border-4 border-gray-900 rounded-lg ${retroShadow} animate-pulse-slow`}>
            {title}
          </h1>
          <p className={`mt-3 text-lg font-semibold text-white bg-pink-400 inline-block px-4 py-2 border-2 border-gray-900 rounded-sm ${retroShadow}`}>
            {subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map((field) => (
            <React.Fragment key={field.name}>
              {field.section && (
                <div className="md:col-span-2 mt-4">
                  <h2 className="text-2xl font-bold text-amber-400 border-b-2 border-amber-400 pb-2">
                    {field.section}
                  </h2>
                </div>
              )}
              <RetroInput
                field={field}
                value={formData[field.name]}
                error={errors[field.name]}
                isSuccess={success[field.name]}
                showPassword={showPassword[field.name]}
                showOtpButton={showOTP && field.name === 'phoneNumber' && !otpSent}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onToggleShowPassword={handleToggleShowPassword}
                onSendOTP={handleSendOTP}
              />
              {showOTP && otpSent && field.name === 'phoneNumber' && (
                <RetroInput
                  field={{ name: 'otp', type: 'text', label: 'OTP Verification', icon: 'lock', placeholder: 'Enter 6-digit OTP', required: true }}
                  value={formData.otp || ''}
                  error={errors.otp}
                  isSuccess={success.otp}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                />
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="text-center mt-8">
          <button
            type="button"
            onClick={handleSubmit}
            className={`${buttonBaseClasses} bg-emerald-400 hover:bg-emerald-300 rounded-lg animate-pulse-slow`}
            aria-label="Submit form"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RetroForm;