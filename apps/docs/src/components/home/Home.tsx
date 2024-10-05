import clsx from "clsx";

import { CardsSection } from "./CardsSection";
import { HeroSection } from "./HeroSection";

export const Home = () => (
  <div
    className={clsx([
      "absolute inset-0 md:overflow-hidden",
      "mt-[var(--nextra-navbar-height)] ",
    ])}
  >
    <div className={clsx(["md:h-full"])}>
      {/* Light and Dark Pattern Background */}
      <div
        className={clsx(
          "absolute inset-0 bg-[length:4em_4em]",
          "bg-[linear-gradient(#f4f4f4_0.1em,transparent_0.1em),linear-gradient(90deg,#f4f4f4_0.1em,transparent_0.1em)]",
          "dark:bg-[linear-gradient(#1f2937_0.1em,transparent_0.1em),linear-gradient(90deg,#1f2937_0.1em,transparent_0.1em)]",
        )}
      />

      {/* Main Content */}
      <main
        className={clsx(
          "h-full",
          "bg-gradient-to-r from-white to-[#F1F5F9]",
          "dark:from-[#111827] dark:to-[#1f2937]",
        )}
      >
        <div
          className={clsx(
            "relative max-w-[44rem] mx-auto grid md:grid-cols-[42%_58%] h-full",
          )}
        >
          <section className="flex flex-col justify-center">
            <HeroSection />
          </section>
          <section
            className={clsx(
              "flex flex-col justify-center",
              "overflow-x-auto md:overflow-x-visible",
            )}
          >
            <CardsSection />
          </section>
        </div>
      </main>
    </div>
  </div>
);
