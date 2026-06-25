import { createAvatar } from "@dicebear/core";
import { avataaars } from "@dicebear/collection";
import { cn } from "@/lib/cn";

type AvatarProps = {
  seed: string;
  size?: number;
  className?: string;
  title?: string;
};

export function Avatar({ seed, size = 40, className, title }: AvatarProps) {
  const src = createAvatar(avataaars, { seed, size }).toDataUri();

  return (
    // eslint-disable-next-line @next/next/no-img-element -- DiceBear SVG data URI
    <img
      src={src}
      alt={title ?? seed}
      title={title}
      width={size}
      height={size}
      className={cn("shrink-0 rounded-full border-2", className)}
      style={{ borderColor: "var(--border)" }}
    />
  );
}
