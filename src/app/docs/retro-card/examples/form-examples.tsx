"use client";
import RetroCard from "../retro-card";

const FormExamples: React.FC = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold font-mono mb-6 text-center dark:text-white">
        Form Examples
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Login Form */}
        <RetroCard>
          <form className="space-y-4">
            <h2 className="text-xl font-bold font-mono text-center">LOGIN</h2>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 font-mono mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border-2 border-black dark:border-white dark:bg-gray-800 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#00ff84]"
                placeholder="user@retro.com"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 font-mono mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 border-2 border-black dark:border-white dark:bg-gray-800 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#00ff84]"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black dark:bg-white text-white dark:text-black font-mono font-bold py-2 border-2 border-black dark:border-white hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              Access System
            </button>
          </form>
        </RetroCard>

        {/* Contact Form */}
        <RetroCard>
          <form className="space-y-4">
            <h2 className="text-xl font-bold font-mono text-center">CONTACT</h2>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 font-mono mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-2 border-2 border-black dark:border-white dark:bg-gray-800 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#00ff84]"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 font-mono mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={3}
                className="w-full p-2 border-2 border-black dark:border-white dark:bg-gray-800 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#00ff84] resize-none"
                placeholder="Your message here..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black dark:bg-white text-white dark:text-black font-mono font-bold py-2 border-2 border-black dark:border-white hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              Send Message
            </button>
          </form>
        </RetroCard>
      </div>
    </section>
  );
};

export default FormExamples;
