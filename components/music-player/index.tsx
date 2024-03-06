"use client";
import { useMusicPlayer } from "@/hooks/use-music-player";
import React, { useEffect, useRef } from "react";
import Player from "./player";

export const MusicPlayer = () => {
  const { currentSong, setCurrentSong, isSongPlaying, isMusicPlayerVisible } =
    useMusicPlayer();

  // ============ REFS ============
  const audioRef = useRef<HTMLAudioElement>(null);
  const onPlaying = () => {
    if (audioRef.current) {
      const duration = audioRef.current?.duration;
      const currentTime = audioRef?.current.currentTime;
      setCurrentSong({
        ...currentSong,
        progress: (currentTime / duration) * 100,
        length: duration,
      });
    }
  };

  useEffect(() => {
    if (isSongPlaying) {
      if (audioRef.current) {
        audioRef.current.volume = 0.09;
        audioRef?.current.play();
      }
    } else {
      audioRef.current?.pause();
    }
  }, [isSongPlaying, currentSong, isMusicPlayerVisible]);

  if (!isMusicPlayerVisible) return null;

  return (
    <>
      <audio
        ref={audioRef}
        onTimeUpdate={onPlaying}
        preload="none"
        src={currentSong?.audioSrc}
        type="audio/mp3"
      />
      <Player audioRef={audioRef} />
    </>
  );
};
