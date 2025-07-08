import { FlipWords } from "./flipwords"

export default function FlipwordsView() {
  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
          I love{" "}
          <FlipWords
            words={["creating", "building", "designing", "crafting", "developing", "coding"]}
            className="text-blue-600 dark:text-blue-400"
            duration={2500}
          />
          <br />
          amazing experiences
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          A powerful and customizable text animation component with smooth transitions
        </p>
      </div>
    </div>
  )
}
