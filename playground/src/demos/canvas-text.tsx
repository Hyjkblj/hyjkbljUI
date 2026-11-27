import { cn } from "@/lib/utils";
import { CanvasText } from "@registry/canvas-text/canvas-text";

const BLUE_RAMP = [
  "rgba(0, 153, 255, 1)",
  "rgba(0, 153, 255, 0.9)",
  "rgba(0, 153, 255, 0.8)",
  "rgba(0, 153, 255, 0.7)",
  "rgba(0, 153, 255, 0.6)",
  "rgba(0, 153, 255, 0.5)",
  "rgba(0, 153, 255, 0.4)",
  "rgba(0, 153, 255, 0.3)",
  "rgba(0, 153, 255, 0.2)",
  "rgba(0, 153, 255, 0.1)",
];

export function CanvasTextDemo() {
  return (
    <div className="flex min-h-[22rem] items-center justify-center px-8 py-16">
      <h3
        className={cn(
          "group relative mx-auto max-w-2xl text-left text-4xl leading-tight font-bold tracking-tight text-balance text-neutral-800 md:text-6xl dark:text-neutral-300",
        )}
      >
        Ship landing pages at{" "}
        <CanvasText
          text="Lightning Speed"
          backgroundClassName="bg-white dark:bg-[#0B0B0F]"
          colors={BLUE_RAMP}
          lineGap={4}
          animationDuration={20}
        />
      </h3>
    </div>
  );
}
