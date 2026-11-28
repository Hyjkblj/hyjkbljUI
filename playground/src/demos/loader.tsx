import { Loader, type LoaderVariant } from "@registry/loader/loader";

const VARIANTS: { variant: LoaderVariant; label: string }[] = [
  { variant: "spinner", label: "Spinner" },
  { variant: "dots", label: "Dots" },
  { variant: "bars", label: "Bars" },
  { variant: "dot-matrix", label: "Dot Matrix" },
  { variant: "dither", label: "Dither" },
  { variant: "morph", label: "Morph" },
  { variant: "comet", label: "Comet" },
  { variant: "metaballs", label: "Metaballs" },
  { variant: "newton", label: "Newton" },
  { variant: "helix", label: "Helix" },
  { variant: "scramble", label: "Scramble" },
  { variant: "percent", label: "Percent" },
  { variant: "ascii", label: "ASCII" },
  { variant: "ascii-line", label: "ASCII Line" },
  { variant: "ascii-braille", label: "ASCII Braille" },
  { variant: "ascii-blocks", label: "ASCII Blocks" },
  { variant: "ascii-bounce", label: "ASCII Bounce" },
];

export function LoaderDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 px-6 py-16">
      {VARIANTS.map(({ variant, label }) => (
        <div key={variant} className="flex w-24 flex-col items-center gap-3">
          <Loader variant={variant} size={36} label={`正在加载 · ${label}`} />
          <span className="text-[11px] text-neutral-500">{label}</span>
        </div>
      ))}
    </div>
  );
}
