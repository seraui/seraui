import ThreeDCard from './threed-card';

export default function ThreedcardVew() {
  return (
    <div className="font-sans text-white p-4">
      <ThreeDCard>
        <img
          src="https://i.pinimg.com/736x/17/b2/19/17b2199dcec49a9613da56cadc928af4.jpg"
          alt="Card content"
          className="w-full h-full object-cover rounded-2xl"
        />
      </ThreeDCard>
    </div>
  );
}
