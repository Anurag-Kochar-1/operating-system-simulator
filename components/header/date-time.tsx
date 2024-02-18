"use client";
import { useEffect, useState } from "react";

export const DateTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "numeric",
  };

  return (
    <div className="hidden text-sm font-medium md:flex">
      {currentDateTime.toLocaleString("en-US", options)}
    </div>
  );
};
