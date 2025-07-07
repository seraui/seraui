'use client'
import React, { useState, useEffect } from 'react';

// SVG Icon for visibility ON
const EyeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

// SVG Icon for visibility OFF
const EyeOffIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" x2="22" y1="2" y2="22" />
  </svg>
);

// SVG Icon for validation check (valid)
const CheckIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

// SVG Icon for validation cross (invalid)
const XIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);


// Validation criteria configuration
const validationRules = [
  { id: 'length', text: 'At least 8 characters', regex: /.{8,}/ },
  { id: 'number', text: 'At least 1 number', regex: /\d/ },
  { id: 'lowercase', text: 'At least 1 lowercase letter', regex: /[a-z]/ },
  { id: 'uppercase', text: 'At least 1 uppercase letter', regex: /[A-Z]/ },
  { id: 'special', text: 'At least 1 special character', regex: /[^A-Za-z0-9]/ },
];

// A single validation item component
const ValidationItem = ({ isValid, text }: { isValid: boolean, text: string }) => (
  <li className={`flex items-center transition-colors duration-300 text-sm ${isValid ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}>
    {isValid ? <CheckIcon className="h-4 w-4 mr-2" /> : <XIcon className="h-4 w-4 mr-2" />}
    <span>{text}</span>
  </li>
);


// The main Password Input Component with Validation
const StrongPasswordInput = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [validationState, setValidationState] = useState({
    length: false,
    number: false,
    lowercase: false,
    uppercase: false,
    special: false,
  });
  const [isPristine, setIsPristine] = useState(true);


  // Effect to validate password whenever it changes
  useEffect(() => {
    // If the field is empty, don't show errors yet.
    if (password === '') {
        setIsPristine(true);
        // Reset validation state
        setValidationState({
            length: false, number: false, lowercase: false, uppercase: false, special: false
        });
        return;
    }

    setIsPristine(false);

    // Update validation state based on rules
    const newValidationState = {
      length: validationRules.find(r => r.id === 'length')!.regex.test(password),
      number: validationRules.find(r => r.id === 'number')!.regex.test(password),
      lowercase: validationRules.find(r => r.id === 'lowercase')!.regex.test(password),
      uppercase: validationRules.find(r => r.id === 'uppercase')!.regex.test(password),
      special: validationRules.find(r => r.id === 'special')!.regex.test(password),
    };
    setValidationState(newValidationState);
  }, [password]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a strong password"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-10"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle password visibility"
          >
            {showPassword ? (
              <EyeOffIcon className="h-4 w-4" />
            ) : (
              <EyeIcon className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Validation Criteria Section */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium">Password requirements:</h3>
            {isPristine && <p className="text-xs text-muted-foreground">Enter a password to check</p>}
        </div>
        <ul className="space-y-2">
            {validationRules.map(rule => (
                <ValidationItem
                    key={rule.id}
                    isValid={validationState[rule.id as keyof typeof validationState]}
                    text={rule.text}
                />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default StrongPasswordInput;
