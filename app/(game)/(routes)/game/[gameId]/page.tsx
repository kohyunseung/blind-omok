"use client";

import { useState } from "react";

import OmokBoard from "@/components/board";
import BoardEvent from "@/components/board-event";
import MemoriedStone from "@/components/stone";

import { ReactMouseEvent, ReactTouchEvent } from "@/types";

const GamePage = () => {
  const [inBoard, setInBoard] = useState(false);
  const [myTurn, setMyTurn] = useState(false);
  const [coord, setCoord] = useState<{ x?: number; y?: number }>({});
  const [isGameEnd, setGameEnd] = useState(false);
  const takes: object[] = [];

  const handleBoardEnter = () => {
    setInBoard(true);
  };

  const handleBoardLeave = () => {
    setInBoard(false);
  };

  const handleBoardMove = (event: ReactMouseEvent) => {
    //이미 돌이 존재하면 건너뜀
    if (takes.find((c) => c.x === coord.x && c.y === coord.y) === undefined) {
      setCoord(coord);
    }
  };

  const handleBoardSelect = () => {
    setMyTurn(false);
    console.log(`Select [${coord?.x},${coord?.y}]`);
    // socket.emit("player_selected", coord);
  };
  return (
    <main className="flex items-center justify-between p-24">
      <div className="relative">
        <BoardEvent
          onBoardEnter={handleBoardEnter}
          onBoardMove={handleBoardMove}
          onBoardLeave={handleBoardLeave}
          onBoardSelect={handleBoardSelect}
        />
        <OmokBoard />
        {/* <MemoriedStone x={9} y={8} player="black" />
        <MemoriedStone x={9} y={9} player="white" /> */}
      </div>
    </main>
  );
};

export default GamePage;
