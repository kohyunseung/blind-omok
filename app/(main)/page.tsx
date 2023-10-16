"use client";

import { useState, useEffect } from "react";

import OmokBoard from "@/components/board";
import Server from "@/components/server";
import MemoriedStone from "@/components/stone";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoad(true);
    }, 10000);
  }, []);

  return (
    <main className="flex items-center justify-between p-24 h-full bg-gradient-to-b from-orange-500 via-orange-300 to-orange-100 w-full">
      <div className="flex flex-row flex-wrap justify-between items-center h-full w-full">
        {isLoad ? (
          <div className="flex flex-row flex-wrap justify-between items-center gap-3 w-full">
            <Server name="test" hasPassword={false} players={[]} />
            <Server name="test" hasPassword={false} players={[]} />
            <Server name="test" hasPassword={false} players={[]} />
            <Server name="test" hasPassword={false} players={[]} />
          </div>
        ) : (
          <div className="flex flex-row flex-wrap justify-between items-center gap-3 w-full">
            <Skeleton className="basis-1/2 w-[100px] h-[100px]" />
            <Skeleton className="basis-1/2 w-[100px] h-[100px]" />
            <Skeleton className="basis-1/2 w-[100px] h-[100px]" />
            <Skeleton className="basis-1/2 w-[100px] h-[100px]" />
          </div>
        )}
      </div>
    </main>
  );
}
