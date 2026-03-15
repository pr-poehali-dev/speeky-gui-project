interface AvatarBubbleProps {
  initials: string;
  size?: "sm" | "md" | "lg";
  purple?: boolean;
}

export default function AvatarBubble({ initials, size = "md", purple = false }: AvatarBubbleProps) {
  const s = size === "lg" ? "w-14 h-14 text-base" : size === "sm" ? "w-8 h-8 text-[10px]" : "w-10 h-10 text-[11px]";
  return (
    <div className={`${s} rounded-full flex items-center justify-center font-semibold flex-shrink-0
      ${purple
        ? "bg-[hsl(265,40%,22%)] text-[hsl(265,80%,78%)]"
        : "bg-[hsl(240,10%,18%)] text-[hsl(240,15%,65%)]"
      }`}>
      {initials}
    </div>
  );
}
