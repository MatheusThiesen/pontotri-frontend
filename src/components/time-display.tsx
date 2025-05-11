"use client";

import { format } from "date-fns";
import { useEffect, useState } from "react";

export function TimeDisplay() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="text-3xl font-bold font-mono text-gray-800">
        {format(currentTime, "HH:mm:ss")}
      </div>
      <div className="text-sm text-gray-500 mt-1">
        {format(currentTime, "EEEE, MMMM d, yyyy")}
      </div>
    </div>
  );
}
