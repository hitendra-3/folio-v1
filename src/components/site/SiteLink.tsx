import { Link } from "@tanstack/react-router";
import type { ComponentProps } from "react";
import { useSound } from "@/lib/sound";

type Props = ComponentProps<typeof Link>;

/** Router link wired into the site's shared sound language. */
export function SiteLink({ onMouseEnter, onClick, ...props }: Props) {
  const { play } = useSound();
  return (
    <Link
      {...props}
      onMouseEnter={(e) => {
        play("hover");
        onMouseEnter?.(e);
      }}
      onClick={(e) => {
        play("nav");
        onClick?.(e);
      }}
    />
  );
}
