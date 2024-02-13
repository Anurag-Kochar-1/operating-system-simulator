import { useApp } from "@/hooks/store";
import React from "react";
import Window from "../window";

export const Windows = () => {
  const { windows } = useApp();
  return (
    <>
      {windows?.map((window) => {
        return <Window key={window.id} title={window.title} id={window.id} />;
      })}
    </>
  );
};
