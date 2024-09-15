export type Player = {
  id: number;
  name: string;
  hasSubmitted: boolean;
  roomId: string;
  imgUrl: string;
  ratings: {
    playerId: string;
    rating: number;
  };
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
