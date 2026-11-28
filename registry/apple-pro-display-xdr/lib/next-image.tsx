/**
 * HY-MODIFIED：next/image 的轻量替身。
 * 原组件（Cult UI）用 Next.js 的 <Image fill /> 铺满屏幕区域；本仓库不依赖 Next，
 * 这里用普通 <img> 复刻它的行为：fill → absolute inset-0 + object-cover。
 * 需要真正的图片优化时，把导入换回 next/image 即可。
 */
import type { CSSProperties } from "react";

type ImageProps = {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
};

export default function Image({
  src,
  alt,
  fill,
  width,
  height,
  className,
  style,
}: ImageProps) {
  const fillStyle: CSSProperties = fill
    ? { position: "absolute", inset: 0, width: "100%", height: "100%", ...style }
    : { ...style };

  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      className={className}
      style={fillStyle}
      draggable={false}
    />
  );
}
