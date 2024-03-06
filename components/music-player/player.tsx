import React, { useRef } from "react";
import Image from "next/image";
import { useMusicPlayer } from "@/hooks/use-music-player";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";

interface IProps {
  audioRef: React.RefObject<HTMLAudioElement>;
}
const Player = ({ audioRef }: IProps) => {
  const {
    songs,
    currentSong,
    setCurrentSong,
    isSongPlaying,
    setIsSongPlaying,
  } = useMusicPlayer();
  const progressBarContainerRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);

  const playPause = () => {
    setIsSongPlaying(!isSongPlaying);
  };

  const checkWidth = (e: any) => {
    if (progressBarContainerRef.current && isSongPlaying) {
      let width = progressBarContainerRef.current?.clientWidth;
      const offset = e.nativeEvent.offsetX;

      const divProgress = (offset / width) * 100;
      if (audioRef.current) {
        if (currentSong?.length) {
          audioRef.current.currentTime =
            (divProgress / 100) * currentSong?.length;
        }
      }
    }
  };

  const previousSong = () => {
    const index = songs.findIndex((x) => x.id == currentSong?.id);
    if (index === 0) {
      setCurrentSong(songs[songs.length - 1]);
    } else {
      setCurrentSong(songs[index - 1]);
    }
    if (!audioRef?.current) return;
    audioRef.current.currentTime = 0;
  };

  const nextSong = () => {
    const index = songs.findIndex((x) => x.id == currentSong?.id);
    if (index == songs.length - 1) {
      setCurrentSong(songs[0]);
    } else {
      setCurrentSong(songs[index + 1]);
    }
    if (!audioRef?.current) return;
    audioRef.current.currentTime = 0;
  };

  return (
    <div className="mb-12 ml-auto mr-12 mt-auto flex h-36 w-full select-none flex-col items-center justify-center border-2 border-background bg-foreground sm:w-96">
      <div className="-ml-3 -mt-3 flex h-full w-full flex-col items-center justify-start border-2 border-foreground bg-secondary">
        {/* ========== Header ========== */}
        <div
          ref={headerRef}
          className={`flex h-10 w-full items-center justify-between bg-foreground px-2 hover:cursor-pointer`}
        >
          {/* ========== Dots ========== */}
          <div className="flex items-center justify-center space-x-2">
            <span className="h-3 w-3 rounded-full bg-[#269B4E] hover:cursor-pointer"></span>
            <span className="h-3 w-3 rounded-full bg-[#E9493D] hover:cursor-pointer"></span>
            <span className="h-3 w-3 rounded-full bg-[#FFF052] hover:cursor-pointer"></span>
          </div>

          <span className="text-xs font-semibold text-background sm:text-sm ">
            {" "}
            SONGS I HEAR ALL THE TIME{" "}
          </span>
          <Play size={20} className="hidden text-background sm:inline-block" />
        </div>

        {/* ========== Container ========== */}
        <div className="flex h-full w-full items-center justify-start">
          <div className="flex items-center justify-center px-1 py-1 sm:px-2">
            <Image
              src={currentSong?.thumbnail as string}
              alt={"Thumbnail"}
              width={150}
              height={150}
              className={`aspect-square w-20 rounded-full  ${isSongPlaying && "animate-spin"}`}
              draggable={false}
            />
          </div>

          {/* ========== Sub container ========== */}
          <div className="flex w-full flex-col items-start justify-start">
            <h5 className="text-base font-medium text-foreground">
              {" "}
              {currentSong?.title}{" "}
            </h5>
            <h6 className="text-sm font-normal text-foreground">
              {" "}
              {currentSong?.songBy}{" "}
            </h6>

            {/* ========== Bar ========== */}
            <div
              ref={progressBarContainerRef}
              onClick={checkWidth}
              className="justify-star my-1 flex h-3 w-[95%] items-center bg-foreground hover:cursor-pointer"
            >
              <div
                style={{ width: `${currentSong?.progress + "%"}` }}
                className={`h-full bg-[#7FFF5B]`}
              ></div>
            </div>

            {/* ========== Controls ========== */}
            <div className="flex items-center justify-center space-x-2">
              <SkipBack
                size={20}
                onClick={previousSong}
                className="hover:cursor-pointer"
              />
              {!isSongPlaying && (
                <Play
                  size={20}
                  onClick={playPause}
                  className="hover:cursor-pointer"
                />
              )}
              {isSongPlaying && (
                <Pause
                  size={20}
                  onClick={playPause}
                  className="hover:cursor-pointer"
                />
              )}
              <SkipForward
                size={20}
                onClick={nextSong}
                className="hover:cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Player);
