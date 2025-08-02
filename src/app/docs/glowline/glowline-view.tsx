import GlowLine from './glowline';

// Main App component
const GlowlineView: React.FC = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Glow lines */}

      <GlowLine orientation="horizontal" position="50%" color="blue" />
      <GlowLine orientation="horizontal" position="30%" color="green" />
      <GlowLine orientation="horizontal" position="70%" color="red" />
    </div>
  );
};

export default GlowlineView;
