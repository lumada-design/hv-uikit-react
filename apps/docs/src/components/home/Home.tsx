import { CSSProperties } from "react";

import { CardsSection } from "./CardsSection";
import { HeroSection } from "./HeroSection";

const styles: { [key: string]: CSSProperties } = {
  backgroundPattern: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "transparent",
    backgroundImage:
      "linear-gradient(#f4f4f4 0.1em, transparent 0.1em), linear-gradient(90deg, #f4f4f4 0.1em, transparent 0.1em)",
    backgroundSize: "4em 4em",
  },
};

export const Home = () => (
  <main className="absolute inset-0 md:overflow-hidden">
    <div style={styles.backgroundPattern} />
    <div className="mt-8 mx-auto bg-gradient-to-r from-white to-[#F1F5F9] h-[calc(100vh_-_64px)]">
      <div className="relative max-w-[1440px] mx-auto grid md:grid-cols-[40%_60%] h-full">
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
