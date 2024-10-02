import { HvButton } from "@hitachivantara/uikit-react-core";

export const HeroSection = () => (
  <div className="p-3">
    <h1 className="text-[1.35rem] font-bold leading-[1.6rem]">
      Build your NEXT
      <br />
      Digital Products Faster
    </h1>
    <h3 className="text-[0.6rem] pt-1.5">
      <b>Hitachi Vantara</b> UI library that gives you the foundation
      <br />
      to create consistent, top-tier digital experiences efficiently.
    </h3>
    <HvButton variant="primary" size="lg" className="mt-4">
      Get Started
    </HvButton>
  </div>
);
