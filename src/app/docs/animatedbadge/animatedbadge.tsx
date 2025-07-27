"use client";
import React from "react";

const FlowerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 200 200"
    width="20"
    height="20"
    className="coolshapes flower-1 opacity-80 dark:opacity-100"
  >
    <g clipPath="url(#cs_clip_1_flower-1)">
      <mask
        id="cs_mask_1_flower-1"
        style={{ maskType: "alpha" }}
        width="200"
        height="186"
        x="0"
        y="7"
        maskUnits="userSpaceOnUse"
      >
        <path
          fill="#fff"
          d="M150.005 128.863c66.681 38.481-49.997 105.828-49.997 28.861 0 76.967-116.658 9.62-49.997-28.861-66.681 38.481-66.681-96.207 0-57.727-66.681-38.48 49.997-105.827 49.997-28.86 0-76.967 116.657-9.62 49.997 28.86 66.66-38.48 66.66 96.208 0 57.727z"
        ></path>
      </mask>
      <g mask="url(#cs_mask_1_flower-1)">
        <path fill="#fff" d="M200 0H0v200h200V0z"></path>
        <path
          fill="url(#paint0_linear_748_4711)"
          d="M200 0H0v200h200V0z"
        ></path>
        <g filter="url(#filter0_f_748_4711)">
          <path fill="#FF58E4" d="M130 0H69v113h61V0z"></path>
          <path
            fill="#0CE548"
            fillOpacity="0.35"
            d="M196 91H82v102h114V91z"
          ></path>
          <path
            fill="#FFE500"
            fillOpacity="0.74"
            d="M113 80H28v120h85V80z"
          ></path>
        </g>
      </g>
    </g>
    <defs>
      <filter
        id="filter0_f_748_4711"
        width="278"
        height="310"
        x="-27"
        y="-55"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
        <feBlend
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        ></feBlend>
        <feGaussianBlur
          result="effect1_foregroundBlur_748_4711"
          stdDeviation="27.5"
        ></feGaussianBlur>
      </filter>
      <linearGradient
        id="paint0_linear_748_4711"
        x1="186.5"
        x2="37"
        y1="37"
        y2="186.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#0E6FFF" stopOpacity="0.51"></stop>
        <stop offset="1" stopColor="#00F0FF" stopOpacity="0.59"></stop>
      </linearGradient>
      <clipPath id="cs_clip_1_flower-1">
        <path fill="#fff" d="M0 0H200V200H0z"></path>
      </clipPath>
    </defs>
    <g style={{ mixBlendMode: "overlay" }} mask="url(#cs_mask_1_flower-1)">
      <path
        fill="gray"
        stroke="transparent"
        d="M200 0H0v200h200V0z"
        filter="url(#cs_noise_1_flower-1)"
      ></path>
    </g>
    <defs>
      <filter
        id="cs_noise_1_flower-1"
        width="100%"
        height="100%"
        x="0%"
        y="0%"
        filterUnits="objectBoundingBox"
      >
        <feTurbulence
          baseFrequency="0.6"
          numOctaves="5"
          result="out1"
          seed="4"
        ></feTurbulence>
        <feComposite
          in="out1"
          in2="SourceGraphic"
          operator="in"
          result="out2"
        ></feComposite>
        <feBlend
          in="SourceGraphic"
          in2="out2"
          mode="overlay"
          result="out3"
        ></feBlend>
      </filter>
    </defs>
  </svg>
);

type AnimatedBadgeProps = {
  text: string;
  icon: React.ReactNode;
  borderColor: string;
  className?: string;
};

const AnimatedBadge = ({
  text,
  icon,
  borderColor,
  className = "",
}: AnimatedBadgeProps) => {
  return (
    <div
      className={`rounded-full p-[1px] bg-gradient-to-r from-transparent ${borderColor} to-transparent [background-size:400%_100%] ${className}`}
      style={{ animation: "move-bg 8s linear infinite" }}
    >
      <div className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-[#0a091e] px-4 py-1.5 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-transparent">
        {icon}
        <span>{text}</span>
      </div>
    </div>
  );
};

export default function AnimatedBadgeView(): React.ReactElement {
  const animatedGradientColors = [
    "via-white",
    "via-sky-500",
    "via-emerald-500",
    "via-rose-500",
    "via-amber-500",
    "via-purple-500",
    "via-pink-500",
    "via-teal-500",
    "via-cyan-500",
    "via-indigo-500",
  ];

  return (
    <>
      <style>
        {`
          @keyframes move-bg {
            to {
              background-position: 400% 0;
            }
          }
        `}
      </style>
      <section
        aria-label="Sera UI Buttons"
        className="relative flex w-full items-center justify-center overflow-hidden p-4 font-sans antialiased bg-white dark:bg-black"
      >
        <div className="z-10 flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-4">
            {animatedGradientColors.map((colorClass, index) => (
              <AnimatedBadge
                key={index}
                text="Sera UI"
                icon={<FlowerIcon />}
                borderColor={colorClass}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
