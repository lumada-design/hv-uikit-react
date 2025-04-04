import { useMemo } from "react";
import { ArrowRight } from "@phosphor-icons/react/ArrowRight";
import { clsx } from "clsx";
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
      <span className="relative ml-sm h-[1.2em] w-full overflow-hidden color-primary">
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
  <div className="p-md max-md:mt-40px">
    {/* <div className="text-sm font-mono mb-2 hidden sm:block">
      <code className="!p-1">npx @hitachivantara/hv-uikit-cli create</code>
    </div> */}
    <h1
      className={clsx([
        "text-3rem leading-3rem font-bold",
        "max-sm:text-1.8rem max-sm:leading-2.5rem",
      ])}
    >
      Build your NEXT
      <br />
      <SlideText />
    </h1>
    <h3
      className={clsx([
        "max-w-528px",
        "text-1.2rem leading-2rem mt-sm",
        "max-sm:text-1rem max-sm:leading-1.6rem",
      ])}
    >
      <b>Hitachi Vantara</b> UI library that gives you the foundation to create
      consistent, top-tier digital experiences efficiently.
    </h3>
    <HvButton size="lg" className="mt-md max-sm:w-full mr-sm">
      Get Started
    </HvButton>
    <HvButton
      variant="subtle"
      size="lg"
      className="mt-md max-sm:w-full hidden sm:inline-flex"
    >
      Explore components <span className="ml-sm" />
      <ArrowRight />
    </HvButton>
  </div>
);
