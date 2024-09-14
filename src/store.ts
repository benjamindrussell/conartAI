import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PlayerState {
  name: string;
  setPlayerName: (name: string) => void;
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set) => ({
      name: "",
      setPlayerName: (name) => set({ name }),
    }),
    {
      name: "player-storage",
    },
  ),
);
