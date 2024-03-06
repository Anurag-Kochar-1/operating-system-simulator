import { SONGS } from "@/config/songs.config";
import { Song } from "@/types";
import { create } from "zustand";

interface State {
  songs: Song[];
  setSongs: (dat: Song[]) => void;
  isSongPlaying: boolean;
  setIsSongPlaying: (val: boolean) => void;
  currentSong: Song | null;
  setCurrentSong: (data: Song) => void;
  isMusicPlayerVisible: boolean;
  setIsMusicPlayerVisible: (val: boolean) => void;
}

export const useMusicPlayer = create<State>()((set, get) => ({
  songs: SONGS,
  setSongs: (data: Song[]) => set({ songs: data }),
  isSongPlaying: false,
  setIsSongPlaying: (val: boolean) => set({ isSongPlaying: val }),
  currentSong: SONGS[0],
  setCurrentSong: (data: Song) => set({ currentSong: data }),
  isMusicPlayerVisible: true,
  setIsMusicPlayerVisible: (val: boolean) => set({ isMusicPlayerVisible: val }),
}));
