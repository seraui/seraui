"use strict";

const imageLoader = ({ src, width, quality }) => {
  // For external URLs, return as-is
  if (src.startsWith("http")) {
    return src;
  }

  // Clean up the src path to avoid double slashes
  const cleanSrc = src.startsWith("/") ? src.slice(1) : src;

  // For local images, use next-image-export-optimizer
  return `/_next/static/media/${cleanSrc}?w=${width}&q=${quality || 75}`;
};

module.exports = imageLoader;
