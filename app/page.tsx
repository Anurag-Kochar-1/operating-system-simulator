"use client";
import { Dock } from "@/components/dock";
import { Header } from "@/components/header";
import Window from "@/components/window";
import { APPS } from "@/config/apps.config";
import { useState } from "react";

export default function Home() {
  function generateRandomString(length: number): string {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }
  const [focusedWindow, setFocusedWindow] = useState<any>("0x");
  const [windows, setWindows] = useState<{ id: string; title: string }[]>([]);

  const handleAddWindow = () => {
    const id = generateRandomString(10);
    setFocusedWindow(id);
    setWindows((prev) => [...prev, { id, title: id }]);
  };

  const renderWindows = () => {
    return windows.map((app, index) => {
      return (
        <Window
          key={index}
          title={app.title}
          id={app.id}
          focusedWindow={focusedWindow}
          setFocusedWindow={setFocusedWindow}
          handleRemoveWindow={(id) => {
            const x = windows.filter((item) => item.id !== id);
            setWindows((p) => x);

            setFocusedWindow(windows[windows?.length - 1].id);
          }}
        />
      );
    });
  };

  return (
    <main className="flex h-screen w-full flex-col overflow-hidden">
      {renderWindows()}
      <Header />
      <section className="flex h-full max-h-[calc(100vh-56px)] w-full flex-row items-center justify-between overflow-y-hidden bg-red-800">
        <Dock />
        {/* <button onClick={() => console.log(focusedWindow)}> log state </button> */}

        <button onClick={handleAddWindow}> Add + </button>
      </section>
    </main>
  );
}
