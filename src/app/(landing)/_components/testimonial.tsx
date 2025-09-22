"use client";

function Testimonial() {
  const testimonials = [
    {
      name: "OrcDev",
      title: "Software Engineer & YouTuber",
      text: "You’re killing it! Keep up the good work! ⚔️",
      image: "https://avatars.githubusercontent.com/u/7549148?v=4&s=64",
    },
    {
      name: "Ikram Sarkar",
      title: "Web Developer",
      text: `Sera UI is really good! I have used many websites with Sera UI and it’s always very helpful. The design is clean and user-friendly.`,
      image:
        "https://i.postimg.cc/1Rj7JLG4/512908506-1261994748789025-5837757630180600658-n.jpg",
    },
    {
      name: "Sehab Ahmed",
      title: "Full Stack Developer",
      text: "I’m speechless. This site is extraordinary! I’m truly surprised after visiting it. It’s so good means so good. I have no words to describe it.",
      image: "https://i.postimg.cc/3rjmyNYJ/image.png",
    },
    {
      name: "Jakaria Ahmed",
      title: "Web Designer",
      text: `Sera UI is truly amazing! 🎉
       The interface is clean, the color scheme is pleasant to the eyes, and the navigation feels super smooth. I especially love the user-friendly design—it’s easy for even new users to get comfortable quickly.
       In the future, adding a dark mode and more customization options could make it even more powerful.
       Kudos to the team for such an impressive work. 🙌`,
      image: "https://i.postimg.cc/4xpQZLVt/image.png",
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
      text: "This is amazing and so useful!! Tysm for sharing this and congrats Zane Whitaker ♻!! Great job! ✨",
      image: "https://i.postimg.cc/xTJRXYxs/image.png",
    },
    {
      name: "Abdullah Al Rakib",
      title: "Full-Stack developer",
      text: "I have been watching this project from the early versions, loving the improvement, brother.",
      image: "https://avatars.githubusercontent.com/u/121743420?v=4",
    },
    {
      name: "Rashel Hossen",
      title: "Full Stack Developer",
      text: "I have been following your work for a considerable period, as have my colleagues, including international software engineers. It is regrettable that we have not had the opportunity to connect earlier. Otherwise, we would have welcomed the chance for engaging discussions with you. We hold your SeraUi in high regard and intend to incorporate it into our work. I am particularly fond of it myself. I hope that we can have a pleasant conversation in the future.",
      image: "https://i.postimg.cc/MT9YNnRF/image.png",
    },
    {
      name: "Md Sinikdho Mahmud",
      title: "Web Developer",
      text: `Sera UI truly lives up to its name—it's the best in both design and performance.
The UI components are next-level and incredibly good-looking.
In one word: outstanding! I'm using Sera UI in my projects, and it’s working perfectly.`,
      image: "https://i.postimg.cc/rsttjs9W/image.png",
    },

    {
      name: "AL Shahed",
      title: "Web Developer",
      text: `Sera UI is simply outstanding! ✨ The website looks clean and modern, and it’s super easy to use. Every component feels like exactly what I was looking for. As an open-source library, it not only saves time but also makes projects more polished and professional. Truly a great resource for developers. Huge thanks to the team—please keep up the amazing work!|
`,
      image: "https://avatars.githubusercontent.com/u/163788370?v=4",
    },
  ];

  const anonymousFallbackImage =
    "https://placehold.co/48x48/6B7280/FFFFFF?text=AA";

  return (
    <div className="font-sans flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8">
      {/* Main Heading */}
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center max-w-4xl leading-tight mb-4 text-gray-900 dark:text-white">
        Loved by community
      </h2>

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
