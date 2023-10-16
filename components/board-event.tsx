"use client";

import { ReactMouseEvent, ReactTouchEvent } from "@/types";

interface Props {
  onBoardEnter: () => void;
  onBoardMove: ({ x, y }: { x: number; y: number }) => void;
  onBoardLeave: () => void;
  onBoardSelect: () => void;
}

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const BOARD_OFFSET = 3.62;
const BOARD_SPACE = 5.14;

const BoardEvent = ({
  onBoardEnter,
  onBoardMove,
  onBoardLeave,
  onBoardSelect,
}: Props) => {
  function getCoord(event: ReactMouseEvent) {
    let coordX = 0;
    let coordY = 0;

    if (!isMobile) {
      const percentX =
        (event.nativeEvent.offsetX * 100.0) /
        (event.target as HTMLElement).clientWidth;
      const percentY =
        (event.nativeEvent.offsetY * 100.0) /
        (event.target as HTMLElement).clientHeight;

      coordX = Math.floor((percentX - BOARD_OFFSET) / BOARD_SPACE + 0.5);
      coordY = Math.floor((percentY - BOARD_OFFSET) / BOARD_SPACE + 0.5);
    }

    if (coordX < 0) coordX = 0;
    if (coordY < 0) coordY = 0;

    if (coordX > 18) coordX = 18;
    if (coordY > 18) coordY = 18;

    return {
      x: coordX,
      y: coordY,
    };
  }

  function getMobileCoord(event: ReactTouchEvent) {
    let coordX = 0;
    let coordY = 0;
    const bcr = (event.target as HTMLElement).getBoundingClientRect();
    const x = event.targetTouches[0].clientX - bcr.x;
    const y = event.targetTouches[0].clientY - bcr.y;

    const percentX =
      (x * 100.0) / (event.targetTouches[0].target as HTMLElement).clientWidth;
    const percentY =
      (y * 100.0) / (event.targetTouches[0].target as HTMLElement).clientHeight;
    coordX = Math.floor((percentX - BOARD_OFFSET) / BOARD_SPACE + 0.5);
    coordY = Math.floor((percentY - BOARD_OFFSET) / BOARD_SPACE - 1.5);

    if (coordX < 0) coordX = 0;
    if (coordY < 0) coordY = 0;

    if (coordX > 18) coordX = 18;
    if (coordY > 18) coordY = 18;

    return {
      x: coordX,
      y: coordY,
    };
  }

  const onMouseEnter = () => {
    if (isMobile) return;
    onBoardEnter();
  };

  const onMouseMove = (event: ReactMouseEvent) => {
    if (isMobile) return;
    onBoardMove(getCoord(event));
  };

  const onMouseLeave = () => {
    if (isMobile) return;
    onBoardLeave();
  };

  const onMouseClick = () => {
    if (isMobile) return;
    onBoardSelect();
  };

  const onTouchStart = (event: ReactTouchEvent) => {
    if (!isMobile) return;
    onBoardEnter();
    onBoardMove(getMobileCoord(event));
  };

  const onTouchMove = (event: ReactTouchEvent) => {
    if (!isMobile) return;
    onBoardMove(getMobileCoord(event));
  };

  const onTouchEnd = () => {
    if (!isMobile) return;
    onBoardLeave();
    onBoardSelect();
  };

  return (
    <div
      className="absolute w-full h-full top-0 bottom-0 z-10"
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onMouseClick}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    ></div>
  );
};

export default BoardEvent;
