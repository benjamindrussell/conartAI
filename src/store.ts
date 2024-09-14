import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PlayerState {
  id: string;
  setPlayerID: (id: string) => void;
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set) => ({
      id: "",
      setPlayerID: (id) => set({ id }),
    }),
    {
      name: "player-storage",
    },
  ),
);
