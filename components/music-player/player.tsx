import React, { useRef } from "react";
import Image from "next/image";
import { useMusicPlayer } from "@/hooks/use-music-player";
import { Loader2, Pause, Play, SkipBack, SkipForward } from "lucide-react";

interface IProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  isLoading: boolean;
}
const Player = ({ audioRef, isLoading }: IProps) => {
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
    setIsSongPlaying(true);
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
    <>
      <div
        className={`mx-auto flex h-40 w-[90%] max-w-md select-none flex-col items-center justify-center bg-foreground md:mx-0 md:ml-auto md:mr-12 md:mt-12 xl:mb-12 xl:mt-auto ${isSongPlaying ? " animate-flicker border" : "border-2 border-foreground"}`}
      >
        <div className="flex h-full w-full flex-col items-center justify-start bg-secondary">
          {/* ========== Header ========== */}
          <div
            ref={headerRef}
            className={`flex h-10 w-full items-center justify-between bg-foreground px-2 hover:cursor-pointer`}
          >
            {/* ========== Dots ========== */}
            <div className="hidden items-center justify-center space-x-2 xs:flex">
              <span className="h-3 w-3 rounded-full bg-[#269B4E] hover:cursor-pointer"></span>
              <span className="h-3 w-3 rounded-full bg-[#E9493D] hover:cursor-pointer"></span>
              <span className="h-3 w-3 rounded-full bg-[#FFF052] hover:cursor-pointer"></span>
            </div>

            <span className="text-xs font-semibold text-background sm:text-sm">
              {" "}
              SONGS I HEAR ALL THE TIME{" "}
            </span>
            <Play
              size={20}
              className="hidden text-background sm:inline-block"
            />
          </div>

          {/* ========== Container ========== */}
          <div className="flex h-full w-full items-center justify-start py-1 pl-2 xs:py-0 xs:pl-0">
            <div className="hidden items-center justify-center px-1 py-1 xs:flex sm:px-2">
              <Image
                src={currentSong?.thumbnail as string}
                alt={"Thumbnail"}
                width={100}
                height={100}
                className={`aspect-square w-20 rounded-full  ${isSongPlaying && "animate-spin"}`}
                draggable={false}
              />
            </div>

            {/* ========== Sub container ========== */}
            <div className="flex w-full flex-col items-start justify-start">
              <h5 className="text-sm font-medium text-foreground xs:text-base">
                {" "}
                {currentSong?.title}{" "}
              </h5>
              <h6 className="text-xs font-normal text-foreground xs:text-sm">
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
                  className={`h-full bg-[#08f]`}
                ></div>
                {/* [#7FFF5B] */}
              </div>

              {/* ========== Controls ========== */}
              <div className="flex items-center justify-center space-x-2">
                <SkipBack
                  size={20}
                  onClick={previousSong}
                  className="hover:cursor-pointer"
                />
                {isLoading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <>
                    {!isSongPlaying ? (
                      <Play
                        size={20}
                        onClick={playPause}
                        className="hover:cursor-pointer"
                      />
                    ) : (
                      <Pause
                        size={20}
                        onClick={playPause}
                        className="hover:cursor-pointer"
                      />
                    )}
                  </>
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
    </>
  );
};

export default React.memo(Player);
