import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { LiquidGlass } from "@registry/liquid-glass/liquid-glass";

export function LiquidGlassDemo() {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  return (
    <div
      ref={constraintsRef}
      className="relative h-[30rem] w-full overflow-hidden rounded-xl bg-[radial-gradient(120%_120%_at_20%_10%,#4338ca_0%,#0f172a_45%,#020617_100%)]"
    >
      {/* 背景纹理：让折射看得出来 */}
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(115deg,rgba(255,255,255,0.14)_0px,rgba(255,255,255,0.14)_2px,transparent_2px,transparent_26px)]" />
      </div>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center p-8 text-center select-none">
        <p className="text-5xl leading-[0.95] font-bold tracking-tighter text-white md:text-7xl">
          Bend the
          <br />
          light.
        </p>
        <div className="mt-8 grid w-full max-w-md grid-cols-12 gap-1.5">
          {Array.from({ length: 48 }).map((_, i) => (
            <span key={i} className="h-1.5 rounded-full bg-white/80" />
          ))}
        </div>
      </div>

      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        whileDrag={reduceMotion ? undefined : { scale: 1.04 }}
        className="absolute top-1/2 left-1/2 cursor-grab touch-none active:cursor-grabbing"
        style={{ width: 200, height: 200, marginLeft: -100, marginTop: -100 }}
      >
        <LiquidGlass
          radius={100}
          scale={48}
          aberration={14}
          bevelDepth={37}
          frost={0.4}
          tint={0.12}
          className="size-full shadow-[0_12px_40px_rgb(0_0_0/0.25),inset_0_1px_0_rgb(255_255_255/0.5)]"
        />
      </motion.div>
    </div>
  );
}
