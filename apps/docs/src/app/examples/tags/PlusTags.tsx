import { useEffect, useRef, useState } from "react";
import { HvTag, HvTooltip } from "@hitachivantara/uikit-react-core";

const TAGS = [
  "Tag 1",
  "Tag 2",
  "Tag 3",
  "Tag 4",
  "Tag 5",
  "Tag 6",
  "Tag 7",
  "Tag 8",
  "Tag 9",
  "Tag 10",
];

export default function Demo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(TAGS.length);

  const recalculate = () => {
    const container = containerRef.current;
    const measureBox = measureRef.current;
    if (!container || !measureBox) return;

    const tagEls = Array.from(measureBox.children) as HTMLElement[];

    const containerWidth = container.offsetWidth;
    const tagWidths = tagEls.map((el) => el.offsetWidth);
    let totalUsed = 0;

    let total = 0;
    let count = 0;

    for (let i = 0; i < tagWidths.length; i++) {
      total += tagWidths[i] + 8; // account for gap-sm (8px)
      if (total > containerWidth) break;
      totalUsed += tagWidths[i] + 8; // account for gap-sm (8px)
      count++;
    }

    // Reserve space for "+X" tag if not all fit
    if (count < TAGS.length) {
      const plusXWidth = 32;
      if (totalUsed + plusXWidth > containerWidth) {
        count--;
      }
    }

    setVisibleCount(count - 1);
  };

  // Observe resize of the container
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      recalculate();
    });
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  // Wait for styles to be loaded before measuring
  useEffect(() => {
    const waitForStyles = () => {
      const el = measureRef.current?.children[0] as HTMLElement;
      if (!el || el.offsetWidth === 0) {
        requestAnimationFrame(waitForStyles);
      } else {
        recalculate();
      }
    };
    waitForStyles();
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="flex min-w-80px max-w-420px w-300px resize-x overflow-auto p-xs border-1 border-border gap-sm"
      >
        {TAGS.slice(0, visibleCount).map((label) => (
          <HvTag key={label} label={label} />
        ))}
        {visibleCount < TAGS.length && (
          <HvTooltip
            title={
              <div className="flex items-center gap-xs">
                {TAGS.slice(visibleCount).map((label) => (
                  <HvTag key={label} label={label} />
                ))}
              </div>
            }
          >
            <HvTag label={`+${TAGS.length - visibleCount}`} />
          </HvTooltip>
        )}
      </div>

      {/* Hidden tags for measurement */}
      <div
        className="invisible absolute top-0 left-0 flex gap-sm"
        ref={measureRef}
      >
        {TAGS.map((label) => (
          <HvTag key={label} label={label} />
        ))}
        <HvTag label="+99" />
      </div>
    </>
  );
}
