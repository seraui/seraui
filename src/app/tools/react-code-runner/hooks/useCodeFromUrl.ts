import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { decodeCodeFromUrl } from '../utils';

export const useCodeFromUrl = (defaultCode: string) => {
  const searchParams = useSearchParams();
  const [code, setCode] = useState(defaultCode);

  // Load code from URL parameters on mount
  useEffect(() => {
    const codeParam = searchParams.get('code');
    if (codeParam) {
      try {
        const decodedCode = decodeCodeFromUrl(codeParam);
        setCode(decodedCode);
      } catch (error) {
        console.error('Failed to decode code from URL:', error);
      }
    }
  }, [searchParams]);

  return {
    code,
    setCode
  };
};
