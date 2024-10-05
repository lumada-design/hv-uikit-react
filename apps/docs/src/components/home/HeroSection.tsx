import clsx from "clsx";
import { HvButton } from "@hitachivantara/uikit-react-core";

export const HeroSection = () => (
  <div className="p-3 max-md:mt-5">
    <h1
      className={clsx([
        "text-[1.2rem] leading-[1.5rem] font-bold",
        "max-sm:text-[0.9rem] max-sm:leading-[1.25rem]",
      ])}
    >
      Build your NEXT
      <br />
      Digital Products Faster
    </h1>
    <h3
      className={clsx([
        "max-w-[16.5rem]",
        "text-[0.6rem] leading-[0.9rem] mt-2",
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
