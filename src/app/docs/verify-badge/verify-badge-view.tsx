"use client";
import { VerifyBadge, VerifyIcon } from './verify-badge';

export default function VerifyBadgeView() {
  return (
    <div className="space-y-8 p-8">
      <div className="flex flex-wrap gap-4">
        <VerifyBadge type="basic" />
        <VerifyBadge type="gold" />
        <VerifyBadge type="premium" />
      </div>
      <div className="space-y-3">
        {(['basic', 'gold', 'premium'] as const).map(type => (
          <div key={type} className="flex items-center gap-4">
            <span className="w-20 text-sm font-medium capitalize">
              {type}:
            </span>
            <div className="flex items-center gap-3">
              <VerifyBadge type={type} size="xs" />
              <VerifyBadge type={type} size="sm" />
              <VerifyBadge type={type} size="md" />
              <VerifyBadge type={type} size="lg" />
              <VerifyBadge type={type} size="xl" />
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <VerifyIcon type="basic" size="lg" />
        <VerifyIcon type="gold" size="lg" />
        <VerifyIcon type="premium" size="lg" />
      </div>
      <div className="flex gap-4">
        <VerifyBadge 
          type="basic" 
          onClick={() => alert('Basic verification clicked!')}
          className="hover:shadow-blue-500/40"
        />
        <VerifyBadge 
          type="gold" 
          onClick={() => alert('Gold verification clicked!')}
          className="hover:shadow-yellow-500/40"
        />
        <VerifyBadge 
          type="premium" 
          onClick={() => alert('Premium verification clicked!')}
          className="hover:shadow-purple-500/40"
        />
      </div>
    </div>
  );
}