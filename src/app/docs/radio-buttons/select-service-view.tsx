"use client";

import React, { useState } from 'react';
import SelectVehicle from './select-service';

const SelectServiceViewExample = () => {
  const [selected, setSelected] = useState('motorbike');

  const options = [
    { icon: 'Bike', text: 'Bicycle', value: 'bicycle' },
    { icon: 'Bike', text: 'Motorbike', value: 'motorbike' },
    { icon: 'Car', text: 'Car', value: 'car' },
    { icon: 'TramFront', text: 'Train', value: 'train' },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Choose Your Vehicle</h2>
      <SelectVehicle
        options={options}
        selected={selected}
        onChange={setSelected}
      />
    </div>
  );
};

export default SelectServiceViewExample;
