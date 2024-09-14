import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { usePlayerStore } from "../store.ts";


export default function Chat() {
  console.log("chat logged");

  // let { gameCode } = useParams();
  // if (!gameCode) return null;

  // const room = useQuery(api.room.getRoom, { code: gameCode });
  // const players = useQuery(api.player.roomPlayers, { code: gameCode });
  // const name = usePlayerStore((state) => state.name);
  // const ratePlayers = useMutation(api.player.ratePlayers);
  // const setRoomState = useMutation(api.room.setRoomState);

  return (
    <div className="h-[700px] w-[300px] bg-blue-300">
      <h1>hello</h1>
    </div>
  )
}