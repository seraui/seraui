import React from "react";

export const Feature = () => {
  return (
    <div className="md:mt-20 flex items-center justify-between gap-20">
      <div className="flex-1 flex flex-col items-center text-center">
        <h1 className="font-bold flex flex-col text-xl md:text-3xl text-zinc-900 dark:text-zinc-50 capitalize tracking-tight leading-[1.3]">
          Smooth animations, endlessly customizable.
        </h1>
        <p className="text-base md:text-xl font-medium text-zinc-600 dark:text-zinc-400 mt-2 max-w-[32ch]">
          Fine-tuned motion components you can tweak, extend, and make your
          own—with zero hassle.
        </p>

        <div
          style={{
            boxShadow: "0px -30px 80px -40px  rgba(234,88,12,0.5)",
          }}
          className="max-w-5xl mt-16 rounded-xl overflow-hidden relative"
        >
          <img
            src="/images/product.png"
            alt=""
            className="w-full block dark:hidden"
          />
          <img
            src="/images/product-dark.png"
            alt=""
            className="w-full hidden dark:block"
          />
          <div className="absolute bottom-0 left-0 w-full h-1/2 z-10 bg-gradient-to-b from-transparent to-zinc-50 via-zinc-50 dark:to-zinc-950 dark:via-zinc-950" />
        </div>
      </div>
    </div>
  );
};
