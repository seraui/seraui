"use strict";

const imageLoader = ({ src, width, quality }) => {
  // For external URLs, return as-is
  if (src.startsWith("http")) {
    return src;
  }

  // For local images, use next-image-export-optimizer
  return `/_next/static/media/${src}?w=${width}&q=${quality || 75}`;
};

module.exports = imageLoader;
