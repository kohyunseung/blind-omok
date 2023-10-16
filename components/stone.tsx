import { memo } from "react";
import { cn } from "@/lib/utils";

const BOARD_OFFSET = 3.62;
const BOARD_SPACE = 5.14;

interface Props {
  x: number;
  y: number;
  player: "black" | "white";
  isEnd?: boolean;
  type: "hint" | "prev" | null;
}

const Stone = ({ x, y, player, isEnd, type }: Props) => {
  return (
    <div
      className={cn(
        "absolute w-8 h-8 translate-y-[-50%] translate-x-[-50%] rounded-full transition",
        isEnd ? `bg-${player}` : "bg-zinc-500",
        type
          ? type === "hint"
            ? "opacity-60"
            : "w-[2%] h-[2%] bg-pink-500 z-1"
          : ""
      )}
      key={`${x}-${y}`}
      style={{
        left: `${x * BOARD_SPACE + BOARD_OFFSET}%`,
        top: `${y * BOARD_SPACE + BOARD_OFFSET}%`,
      }}
    ></div>
  );
};

const MemoriedStone = memo(Stone);

export default MemoriedStone;
