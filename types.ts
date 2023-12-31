import { MouseEvent, TouchEvent } from "react";
import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export type ReactMouseEvent = MouseEvent<HTMLElement>;
export type ReactTouchEvent = TouchEvent<HTMLDivElement>;
