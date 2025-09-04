"use client"

import React, { useState } from 'react';

const PlanToggle = () => {
  const plans = ['free', 'solo', 'team'];
  const [selected, setSelected] = useState('solo');
  const selectedIndex = plans.indexOf(selected);

  return (
    <div className="relative w-64">
      <span className="absolute -top-4 left-2/3 -translate-x-1/2 text-xs font-medium text-black">Premium</span>
      <div className="relative overflow-hidden rounded-full border border-gray-300 bg-white">
        <div className="flex">
          <label
            htmlFor="free"
            className="flex-1 text-center text-sm font-medium cursor-pointer py-2 z-10"
            style={{ color: selected === 'free' ? 'white' : 'black' }}
          >
            Free
          </label>
          <input
            type="radio"
            id="free"
            name="plan"
            checked={selected === 'free'}
            onChange={() => setSelected('free')}
            className="sr-only"
          />
          <label
            htmlFor="solo"
            className="flex-1 text-center text-sm font-medium cursor-pointer py-2 z-10"
            style={{ color: selected === 'solo' ? 'white' : 'black' }}
          >
            Solo
          </label>
          <input
            type="radio"
            id="solo"
            name="plan"
            checked={selected === 'solo'}
            onChange={() => setSelected('solo')}
            className="sr-only"
          />
          <label
            htmlFor="team"
            className="flex-1 text-center text-sm font-medium cursor-pointer py-2 z-10"
            style={{ color: selected === 'team' ? 'white' : 'black' }}
          >
            Team
          </label>
          <input
            type="radio"
            id="team"
            name="plan"
            checked={selected === 'team'}
            onChange={() => setSelected('team')}
            className="sr-only"
          />
        </div>
        <div
          className="absolute inset-y-0 w-1/3 bg-black rounded-full transition-transform duration-200 ease-in-out"
          style={{ transform: `translateX(${selectedIndex * 100}%)` }}
        />
      </div>
    </div>
  );
};

export default PlanToggle;