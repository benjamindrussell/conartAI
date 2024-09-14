export type Player = {
  id: number;
  name: string;
  hasSubmitted: boolean;
  roomId: string;
};

export type Room = {
  id: string;
  code: string;
  time: number;
  prompt: string;
  players: Player[];
  started: boolean;
};
