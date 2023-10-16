"use client";

import { useState, useEffect } from "react";

import OmokBoard from "@/components/board";
import BoardEvent from "@/components/board-event";
import MemoriedStone from "@/components/stone";

function checkOmokCompleted(
  coord: { x: number; y: number; player: "black" | "white" },
  takes: { x: number; y: number; player: "black" | "white" }[]
) {
  //(0, 1), (1, 1), (1, 0), (1, -1)
  const offset = [
    { x: 1, y: 0 }, //가로
    { x: 1, y: 1 }, //대각선1
    { x: 0, y: 1 }, //세로
    { x: -1, y: 1 }, //대각선2
  ];

  return offset.some((dir) => {
    let streak = 1;
    const player = coord.player;

    //정방향
    for (
      let x = coord.x + dir.x, y = coord.y + dir.y;
      x > 0 && x < 19 && y > 0 && y < 19;
      x += dir.x, y += dir.y
    ) {
      if (takes.some((t, index) => t.x == x && t.y == y && t.player === player))
        streak++;
      else break;
    }

    //반대방향
    for (
      let x = coord.x - dir.x, y = coord.y - dir.y;
      x > 0 && x < 19 && y > 0 && y < 19;
      x -= dir.x, y -= dir.y
    ) {
      if (takes.some((t, index) => t.x == x && t.y == y && t.player === player))
        streak++;
      else break;
    }

    if (streak === 5) {
      return true;
    }
  });
}

const GamePage = () => {
  const [inBoard, setInBoard] = useState(false);
  const [myTurn, setMyTurn] = useState(false);
  const [coord, setCoord] = useState<{
    x: number;
    y: number;
    player: "black" | "white";
  }>({});
  const [isGameEnd, setIsGameEnd] = useState(false);
  const [result, setResult] = useState<
    { x: number; y: number; player: "black" | "white" }[]
  >([]);

  const handleBoardEnter = () => {
    setInBoard(true);
  };

  const handleBoardLeave = () => {
    setInBoard(false);
  };

  const handleBoardMove = ({ x, y }: { x: number; y: number }) => {
    //이미 돌이 존재하면 건너뜀
    if (result.find((r) => r.x === x && r.y === y) === undefined) {
      setCoord({ x, y, player: myTurn ? "black" : "white" });
    }
  };

  const handleBoardSelect = () => {
    if (isGameEnd) return;
    setMyTurn((prev) => !prev);
    console.log(`Select [${coord?.x},${coord?.y}]`);
    setResult((origin) => [...origin, coord]);
    // socket.emit("player_selected", coord);
    if (checkOmokCompleted(coord, result)) {
      setIsGameEnd(true);
    }
  };

  // useEffect(() => {
  //   setTimeout(() => setIsGameEnd(true), 5000);
  // }, []);

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
        {result.length > 0 &&
          result.map((r, i) => (
            <MemoriedStone
              key={`${r.x}${r.y}`}
              x={r.x}
              y={r.y}
              player={r.player}
              type={null}
              isEnd={isGameEnd}
            />
          ))}

        {result.length > 0 ? (
          <MemoriedStone
            type="prev"
            x={result[result.length - 1].x}
            y={result[result.length - 1].y}
            player={result[result.length - 1].player}
          />
        ) : null}
        {myTurn && inBoard ? (
          <MemoriedStone
            type="hint"
            x={coord.x}
            y={coord.y}
            player={coord.player}
          />
        ) : null}
        {/* <MemoriedStone x={9} y={8} player="black" />
        <MemoriedStone x={9} y={9} player="white" /> */}
      </div>
    </main>
  );
};

export default GamePage;
