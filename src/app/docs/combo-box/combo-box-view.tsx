"use client";
import ComboBox from "./combo-box";

const ComboBoxView = () => {
    
  const sampleOptions = [
    "React.js",
    "Vue.js",
    "Angular",
    "Svelte",
    "Ember.js",
    "Backbone.js",
    "jQuery",
    "Bootstrap",
    "Tailwind CSS",
    "Material UI",
    "Ant Design",
    "Chakra UI",
    "Bulma",
    "Foundation",
    "Semantic UI",
    "UIKit",
    "PrimeReact",
    "Grommet",
    "Fluent UI",
    "Rebass",
  ];

  const handleSelect = (option: string | null) => {
    console.log("Selected option:", option);
  };

  return (
    <div className="p-8">
      <p className="text-lg font-bold mb-6">Combo Box Component</p>
      <ComboBox
        options={sampleOptions}
        placeholder="Search fruits..."
        onSelect={handleSelect}
      />
    </div>
  );
};

export default ComboBoxView;
