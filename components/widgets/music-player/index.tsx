"use client";
import { useMusicPlayer } from "@/hooks/use-music-player";
import React, { useEffect, useRef, useState } from "react";
import Player from "./player";

export const MusicPlayer = () => {
  const { currentSong, setCurrentSong, isSongPlaying, isMusicPlayerVisible } =
    useMusicPlayer();

  // ============ REFS ============
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleLoadedData = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (isSongPlaying && audioRef.current) {
      const currentAudioSrc = audioRef.current.src;
      const selectedSongSrc = currentSong?.audioSrc;

      if (currentAudioSrc !== selectedSongSrc) {
        setIsLoading(true);
        audioRef.current.src = selectedSongSrc || "";
        audioRef.current.load();
      }

      audioRef.current.volume = 0.09;
      audioRef.current.play().catch(() => setIsLoading(false));
    } else {
      audioRef.current?.pause();
      setIsLoading(false);
    }
  }, [isSongPlaying, currentSong, isMusicPlayerVisible]);

  if (!isMusicPlayerVisible) return null;

  return (
    <>
      <audio
        ref={audioRef}
        onTimeUpdate={onPlaying}
        onLoadedData={handleLoadedData}
        preload="none"
      />
      <Player audioRef={audioRef} isLoading={isLoading} />
    </>
  );
};
