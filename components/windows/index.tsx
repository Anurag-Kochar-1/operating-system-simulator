"use client";
import { useApp } from "@/hooks/store";
import React from "react";
import Window from "../window";
import { APP_TYPES } from "../constants/app-types.enum";

export const Windows = () => {
  const { windows } = useApp();
  return (
    <>
      {windows?.map((window) => {
        return (
          <Window
            key={window.id}
            title={window.title}
            id={window.id}
            type={window.type as APP_TYPES.APP}
          />
        );
      })}
    </>
  );
};
