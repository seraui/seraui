"use client"
import React from 'react';

function Testimonial2() {
  const testimonials = [
    {
      name: "Jonathan Yombo",
      title: "Software Engineer",
      text: "Tailus is really extraordinary and very practical, no need to break your head. A real gold mine.",
      image: "https://i.postimg.cc/W1rCvYnT/nazmul-hossain.jpg",
    },
    {
      name: "Yves Kakume",
      title: "GDE - Android",
      text: "With no experience in webdesign I just redesigned my entire website in a few minutes with tailwindcss thanks to Tailus.",
      image: "https://i.pinimg.com/736x/8c/6d/db/8c6ddb5fe6600fcc4b183cb2ee228eb7.jpg",
    },
    {
      name: "Yucel Farukşahan",
      title: "Creator, Tailkits",
      text: "Great work on tailfolio template. This is one of the best personal website that I have seen so far :)",
      image: "https://i.pinimg.com/736x/6f/a3/6a/6fa36aa2c367da06b2a4c8ae1cf9ee02.jpg",
    },
    {
      name: "Anonymous author",
      title: "Doing something",
      text: "I am really new to Tailwind and I want to give a go to make some page on my own. I searched a lot of hero pages and blocks online. However, most of them are not giving me a clear view or needed some HTML/CSS coding background to make some changes from the original or too expensive to have. I downloaded the copy of Tailus template which is very clear to understand at the last and you could modify the codes/blocks to fit perfectly on your purpose of the page.",
      image: "https://i.pinimg.com/1200x/c2/4e/27/c24e271f2f992fd7e62e8c1e8d9b3e2f.jpg",
    },
    {
      name: "Shekinah Tshikulila",
      title: "Software Engineer",
      text: "Tailus is redefining the standard of web design, with these blocks it provides an easy and efficient way for those who love beauty but may lack the time to implement it. I can only recommend this incredible wonder.",
      image: "https://i.pinimg.com/736x/81/d6/b1/81d6b158728f5fc97ca6e0a025fefee0.jpg",
    },
    {
      name: "Khatab Wedaa",
      title: "Merakiol Creator",
      text: "Tailus is an elegant, clean, and responsive tailwind css components it's very helpful to start fast with your project.",
      image: "https://i.pinimg.com/736x/9f/46/74/9f4674ca9c17330ab419c1b2f5951d9a.jpg",
    },
    {
      name: "Oketa Fred",
      title: "Fullstack Developer",
      text: "I absolutely love Tailus! The component blocks are beautifully designed and easy to use, which makes creating a great-looking website a breeze.",
      image: "https://i.pinimg.com/736x/57/3c/80/573c80967c9429d0ed0ce32701f85b70.jpg",
    },
    {
      name: "Rodrigo Aguilar",
      title: "Creator, TailwindAwesome",
      text: "I love Tailus ❤️. The component blocks are well-structured, simple to use, and beautifully designed. It makes it really easy to have a good-looking website in no time.",
      image: "https://i.pinimg.com/736x/b0/c4/21/b0c421e77cf563962026ade82c90dd5b.jpg",
    },
    {
      name: "Zeki",
      title: "Founder of ChatExtend",
      text: "Using Tailkit!! has been like unlocking a secret design superpower. It's the perfect fusion of simplicity and versatility, enabling us to create UIs that are as stunning as they are user-friendly.",
      image: "https://i.pinimg.com/736x/ce/31/42/ce3142d7a968fff3aecd0100572a5e8b.jpg",
    },
    {
      name: "Eric Ampire",
      title: "Mobile Engineer at @RBPNews , @GoogleGDE/Expert for Android",
      text: "Tailus templates are the perfect solution for anyone who wants to create a beautiful, functional website without any web design experience. The templates are easy to use, customizable, and responsive, and the support team is always available to help. I highly recommend Tailus templates to anyone who is looking to create a website.",
      image: "https://i.pinimg.com/736x/79/63/a5/7963a5246188d408b8f28961a0cf2b90.jpg",
    },
    {
      name: "Joseph Kitheka",
      title: "Fullstack Developer",
      text: "Tailur has transformed the way I develop web applications. Their extensive collection of UI components, blocks, and templates has significantly accelerated my workflow. The flexibility to customize every aspect allows me to create unique user experiences. Tailus is a game-changer for modern web development!",
      image: "https://i.pinimg.com/736x/8e/c1/f8/8ec1f80db272047cedf4c20263114387.jpg",
    },
    {
      name: "Roland Tubonge",
      title: "Software Engineer",
      text: "Tailus is so well designed that even with a very poor knowledge of web design you can do miracles. Let yourself be seduced!",
      image: "https://i.pinimg.com/1200x/08/a2/41/08a2413b771b729a9f9df20fa97be52a.jpg",
    },
    // Adding more from your provided list to ensure variety if needed
    {
      name: "Jane Doe",
      title: "UX Designer",
      text: "The intuitive interface and powerful features of this platform have revolutionized my design process. Highly recommend for any creative professional!",
      image: "https://i.pinimg.com/736x/b0/7b/cc/b07bcc19e5d06dfb888c3263724b8baa.jpg",
    },
    {
      name: "John Smith",
      title: "Frontend Developer",
      text: "Building responsive layouts has never been easier. This toolkit integrates seamlessly with my existing workflow, saving me countless hours.",
      image: "https://i.pinimg.com/736x/12/ec/d9/12ecd918607b1ccb9d46772435bb592f.jpg",
    },
    {
      name: "Alice Johnson",
      title: "Product Manager",
      text: "The speed at which our team can prototype and launch new features is incredible. This platform is a core part of our success.",
      image: "https://i.pinimg.com/1200x/e2/f5/bc/e2f5bc45bd9d07946c9453cfb48747ea.jpg",
    },
    {
      name: "Bob Williams",
      title: "Fullstack Engineer",
      text: "From backend APIs to stunning frontend components, this solution provides everything needed to build robust and beautiful applications.",
      image: "https://i.pinimg.com/1200x/50/47/d2/5047d259f0d8b3d652b7d3dfa3479139.jpg",
    },
    {
      name: "Charlie Brown",
      title: "Mobile Developer",
      text: "Developing for mobile has unique challenges, but this platform's adaptive components and clear documentation make it a breeze.",
      image: "https://i.pinimg.com/736x/bb/87/18/bb87180897cb4cb694cd692966a0ab15.jpg",
    },
    {
      name: "Diana Prince",
      title: "DevOps Engineer",
      text: "Deployment and scaling are simplified with the integrated tools. It's a reliable and efficient environment for our entire team.",
      image: "https://i.pinimg.com/1200x/fb/c3/03/fbc30308d8f36a5566cbf0a535c14322.jpg",
    },
    {
      name: "Eve Adams",
      title: "Data Scientist",
      text: "Visualizing complex data sets is effortless. The charting and presentation components are powerful and incredibly easy to use.",
      image: "https://i.pinimg.com/1200x/de/11/d2/de11d2f9df4295493625189e9cb829ce.jpg",
    },
  ];

  // Fallback for any images not explicitly mapped or if array runs out
  const anonymousFallbackImage = "https://placehold.co/48x48/6B7280/FFFFFF?text=AA";

  return (
    <div className="font-sans flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8">
      {/* Main Heading */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center max-w-4xl leading-tight mb-4 text-gray-900 dark:text-white">
        Loved by community
      </h1>

      {/* Subheading */}
      <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 text-center max-w-3xl mb-16">
        Harum quae dolore corrupti aut temporibus pariatur.
      </p>

      {/* Testimonial Cards Container - Masonry-like layout */}
      <div className="w-full max-w-7xl columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">

        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white dark:bg-black p-6 rounded-xl shadow-md break-inside-avoid border border-gray-200 dark:border-gray-800">
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
                <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.title}</p>
              </div>
            </div>
            <p className="text-base text-gray-700 dark:text-gray-200 leading-relaxed">
              {testimonial.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonial2;
