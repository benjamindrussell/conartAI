export type Player = {
  id: number;
  name: string;
  hasSubmitted: boolean;
  roomId: string;
};

type State = "waiting" | "started" | "rating" | "review";

export type Room = {
  id: string;
  code: string;
  scribbleTime: number;
  ratingTime: number;
  prompt: string;
  players: Player[];
  started: boolean;
  state: State;
};
