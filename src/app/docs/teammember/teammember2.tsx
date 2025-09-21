'use client'
import React from 'react';

// Define the type for a single team member for type safety
interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
}

// Array of team members data. This could also come from an API.
const teamMembers: TeamMember[] = [
    { name: 'Zane Whitaker', role: 'Founder & CEO', imageUrl: 'https://i.postimg.cc/W1rCvYnT/nazmul-hossain.jpg' },
    { name: 'Emily Jonson', role: 'CEO', imageUrl: 'https://i.pinimg.com/736x/8c/6d/db/8c6ddb5fe6600fcc4b183cb2ee228eb7.jpg' },
    { name: 'Harshita Patel', role: 'HR', imageUrl: 'https://i.pinimg.com/736x/6f/a3/6a/6fa36aa2c367da06b2a4c8ae1cf9ee02.jpg' },
    { name: 'Eleanor Morales', role: 'HR', imageUrl: 'https://i.pinimg.com/1200x/c2/4e/27/c24e271f2f992fd7e62e8c1e8d9b3e2f.jpg' },
    { name: 'Sophia Monic', role: 'Product Manager', imageUrl: 'https://i.pinimg.com/736x/81/d6/b1/81d6b158728f5fc97ca6e0a025fefee0.jpg' },
    { name: 'James Miller', role: 'Marketing Lead', imageUrl: 'https://i.pinimg.com/736x/9f/46/74/9f4674ca9c17330ab419c1b2f5951d9a.jpg' },
    { name: 'Olivia Chen', role: 'Lead Developer', imageUrl: 'https://i.pinimg.com/736x/57/3c/80/573c80967c9429d0ed0ce32701f85b70.jpg' },
    { name: 'Benjamin Carter', role: 'UX Designer', imageUrl: 'https://i.pinimg.com/736x/b0/c4/21/b0c421e77cf563962026ade82c90dd5b.jpg' },
    { name: 'Ava Rodriguez', role: 'Data Scientist', imageUrl: 'https://i.pinimg.com/736x/ce/31/42/ce3142d7a968fff3aecd0100572a5e8b.jpg' },
    { name: 'Lucas Garcia', role: 'Backend Engineer', imageUrl: 'https://i.pinimg.com/736x/79/63/a5/7963a5246188d408b8f28961a0cf2b90.jpg' },
    { name: 'Mia Martinez', role: 'Frontend Developer', imageUrl: 'https://i.pinimg.com/736x/8e/c1/f8/8ec1f80db272047cedf4c20263114387.jpg' },
    { name: 'Henry Wilson', role: 'DevOps Engineer', imageUrl: 'https://i.pinimg.com/1200x/08/a2/41/08a2413b771b729a9f9df20fa97be52a.jpg' },
];

// Sub-component for rendering a single team member's card
const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => (
  <div className="flex flex-col items-center text-center">
    <img
      className="w-32 h-32 md:w-36 md:h-36 rounded-2xl object-cover shadow-lg dark:shadow-gray-800"
      src={member.imageUrl}
      alt={`Portrait of ${member.name}`}
      onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null; // Prevent infinite loop if placeholder fails
          target.src = `https://placehold.co/200x200/cccccc/333333?text=Error`;
        }}
    />
    <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">{member.name}</h3>
    <p className="text-sm text-gray-600 dark:text-gray-300">{member.role}</p>
  </div>
);

// Main component that renders the entire section
const TeamSection: React.FC = () => {
  return (
    <section className="font-sans">
      <div className=" mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Meet the brains
          </h2>
          <p className="mt-3 text-base md:text-lg text-gray-600 dark:text-gray-300">
            These people work on making our product best.
          </p>
        </div>

        {/* Team Members Grid - Adjusted for 12 members */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-12">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;