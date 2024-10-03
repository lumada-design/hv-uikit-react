import clsx from "clsx";

import { CardsSection } from "./CardsSection";
import { HeroSection } from "./HeroSection";

export const Home = () => (
  <main className="absolute inset-0 md:overflow-hidden">
    {/* Light and Dark Pattern Background */}
    <div
      className={clsx(
        "absolute inset-0 bg-transparent h-full bg-[length:4em_4em]",
        "bg-[linear-gradient(#f4f4f4_0.1em,transparent_0.1em),linear-gradient(90deg,#f4f4f4_0.1em,transparent_0.1em)]",
        "dark:bg-[linear-gradient(#1f2937_0.1em,transparent_0.1em),linear-gradient(90deg,#1f2937_0.1em,transparent_0.1em)]",
      )}
    />

    {/* Main Content */}
    <div
      className={clsx(
        "mt-8 mx-auto h-[calc(100vh_-_64px)] bg-gradient-to-r from-white to-[#F1F5F9]",
        "dark:from-[#111827] dark:to-[#1f2937]",
      )}
    >
      <div className="relative max-w-[1440px] mx-auto grid md:grid-cols-2 h-full">
        <section className="flex flex-col justify-center">
          <HeroSection />
        </section>
        <section className="flex flex-col justify-center">
          <CardsSection />
        </section>
      </div>
    </div>
  </main>
);
