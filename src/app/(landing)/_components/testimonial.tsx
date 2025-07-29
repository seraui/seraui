"use client";
import React from "react";

function Testimonial() {
  const testimonials = [
    {
      name: "OrcDev",
      title: "Software Engineer & YouTuber",
      text: "You’re killing it! Keep up the good work! ⚔️",
      image: "https://avatars.githubusercontent.com/u/7549148?v=4&s=64",
    },
    {
      name: "Sehab Ahmed",
      title: "Full Stack Developer",
      text: "I’m speechless. This site is extraordinary! I’m truly surprised after visiting it. It’s so good means so good. I have no words to describe it.",
      image: "https://i.postimg.cc/3rjmyNYJ/image.png",
    },
    {
      name: "Sidharth Baby",
      title: "Full Stack Developer",
      text: "This looks awesome , Love how clean and modern the components are , definitely a great resource for speeding up UI development.Thanks for sharing this.",
      image: "https://i.postimg.cc/14hycspG/image.jpg",
    },
    {
      name: "MD Samin Yesser Nuhas",
      title: "Website Designer",
      text: "Open-source libraries like this are such time-savers. I’ve spent hours customizing components from scratch before… tools like this make projects smoother and more polished.",
      image: "https://i.postimg.cc/g0SXyLr3/image.jpg",
    },
    {
      name: "Tanvir Ahmmed",
      title: "Junior Front -End Web",
      text: "Such a beautifully UI component library for React.js. 💕",
      image: "https://i.postimg.cc/wjPYh6g7/image.jpg",
    },
    {
      name: "Md Mobashirul Alam Seam",
      title: "Frontend Developer ",
      text: "Absolutely amazing. I explored the whole library on my first visit to their website. Each component gives the feeling that, It's just what I'm looking for. I'm very excited to use it.",
      image: "https://i.postimg.cc/V6g7WRnD/image.jpg",
    },
    {
      name: "Ornella Gigante",
      title: "Fullstack Developer",
      text: "This is amazing and so useful!! Tysm for sharing this and congrats Nazmul Hossain ♻!! Great job! ✨",
      image: "https://i.postimg.cc/xTJRXYxs/image.png",
    },
    {
      name: "Abdullah Al Rakib",
      title: "Full-Stack developer",
      text: "I have been watching this project from the early versions, loving the improvement, brother.",
      image: "https://avatars.githubusercontent.com/u/121743420?v=4",
    },
  ];

  const anonymousFallbackImage =
    "https://placehold.co/48x48/6B7280/FFFFFF?text=AA";

  return (
    <div className="font-sans flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8">
      {/* Main Heading */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center max-w-4xl leading-tight mb-4 text-gray-900 dark:text-white">
        Loved by community
      </h1>

      {/* Subheading */}
      <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 text-center max-w-3xl mb-16">
        What People Are Saying
      </p>

      {/* Testimonial Cards Container */}
      <div className="w-full max-w-7xl">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-black p-6 rounded-xl shadow-md break-inside-avoid border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = anonymousFallbackImage;
                  }}
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.title}
                  </p>
                </div>
              </div>
              <p className="text-base text-gray-700 dark:text-gray-200 leading-relaxed">
                {testimonial.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
