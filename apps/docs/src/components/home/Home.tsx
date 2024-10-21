import clsx from "clsx";

import { CardsSection } from "./CardsSection";
import { HeroSection } from "./HeroSection";

export const Home = () => (
  <div
    className={clsx(
      "absolute inset-0 md:overflow-hidden",
      "mt-[var(--nextra-navbar-height)]",
    )}
  >
    {/* Background grid */}
    <div className="absolute h-full w-full bg-[radial-gradient(var(--uikit-colors-secondary\\_80),transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

    {/* Blue gradient background blur */}
    <div className="absolute bottom-0 z-[-2] h-screen w-screen bg-transparent bg-[radial-gradient(ellipse_80%_80%_at_50%_120%,var(--uikit-colors-primary\\_20),transparent)]" />

    {/* Main content area */}
    <main className="h-full">
      <div className="relative max-w-[44rem] mx-auto grid h-full md:grid-cols-[42%_58%]">
        {/* Hero Section */}
        <section className="flex flex-col justify-center">
          <HeroSection />
        </section>

        {/* Cards Section */}
        <section className="flex flex-col justify-center overflow-x-auto md:overflow-x-visible">
          <CardsSection />
        </section>
      </div>
    </main>
  </div>
);