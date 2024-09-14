export type Player = {
  id: number;
  name: string;
  hasSubmitted: boolean;
  roomId: string;
};

type State = "waiting" | "drawing" | "rating" | "review";

export type Room = {
  id: string;
  code: string;
  time: number;
  prompt: string;
  players: Player[];
  started: boolean;
  state: State;
};
