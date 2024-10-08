import { useMemo } from "react";
import clsx from "clsx";
import { HvButton } from "@hitachivantara/uikit-react-core";

const SlideText = () => {
  const slideKeyframes = useMemo(
    () => `
    @keyframes slide {
      0% { transform: translateY(100%); opacity: 0.1; }
      15% { transform: translateY(0); opacity: 1; }
      30% { transform: translateY(0); opacity: 1; }
      45% { transform: translateY(-100%); opacity: 1; }
      100% { transform: translateY(-100%); opacity: 0.1; }
    }
  `,
    [],
  );

  return (
    <div className="flex whitespace-nowrap">
      Products
      <span className="relative ml-2 h-[1.2em] w-full overflow-hidden color-[var(--uikit-colors-primary)]">
        <style>{slideKeyframes}</style>
        {["Faster", "Smarter", "Smoothly"].map((text, index) => (
          <span
            key={text}
            className="absolute"
            style={{
              animation:
                "slide 5s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite",
              animationDelay: `${index * 1.66}s`,
              transform: "translateY(-100%)",
            }}
          >
            {text}
          </span>
        ))}
      </span>
    </div>
  );
};

export const HeroSection = () => (
  <div className="p-3 max-md:mt-5">
    <h1
      className={clsx([
        "text-[1.5rem] leading-[1.85rem] font-bold",
        "max-sm:text-[0.9rem] max-sm:leading-[1.25rem]",
      ])}
    >
      Build your NEXT
      <br />
      <SlideText />
    </h1>
    <h3
      className={clsx([
        "max-w-[16.5rem]",
        "text-[0.65rem] leading-[0.95rem] mt-2",
        "max-sm:text-[0.5rem] max-sm:leading-[0.8rem]",
      ])}
    >
      <b>Hitachi Vantara</b> UI library that gives you the foundation to create
      consistent, top-tier digital experiences efficiently.
    </h3>
    <HvButton variant="primary" size="lg" className="mt-3 max-sm:w-full">
      Get Started
    </HvButton>
  </div>
);
