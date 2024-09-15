import Chat from "../components/Chat";
import React, { useEffect } from "react";
import Replicate from "../components/Replicate";
import Logo from "../components/Logo";
import { useNavigate, useParams } from "react-router";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { usePlayerStore } from "../store.ts";

const Draw: React.FC = () => {
  let { gameCode } = useParams();
  if (!gameCode) return null;

  const room = useQuery(api.room.getRoom, { code: gameCode });
  const startGame = useMutation(api.room.startRoomGame);
  const submitDrawing = useMutation(api.player.submitDrawing);
  const checkIfAllSubmitted = useMutation(api.room.checkIfAllSubmitted);
  const checkIfAllImagesMade = useQuery(api.room.checkIfAllImagesMade, {
    code: gameCode,
  });
  const playerID = usePlayerStore((state) => state.id);
  const navigate = useNavigate();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const displayTime =
    room?.state === "started"
      ? room?.scribbleTime
      : room?.state === "rating"
        ? room?.ratingTime
        : 0;

  const startRoom = async () => {
    await startGame({ code: gameCode });
  };

  const finishDrawing = async () => {
    await submitDrawing({ playerId: playerID, code: gameCode });
    await checkIfAllSubmitted({ code: gameCode });
  };

  useEffect(() => {
    if (room?.state === "rating") {
      navigate(`/vote/${gameCode}`);
    }
  }, [room?.state]);

  return (
    <div className="flex flex-row w-screen h-screen bg-black">
      <div className="flex bg-black flex-col w-[75%]">
        <div className="flex w-full gap-5 py-5">
          <Logo></Logo>
          <div className="w-[9vw] ml-[7vw] shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] bg-[#191919] h-[3vw] rounded-xl">
            <div className="flex items-center justify-center ">
              <h1 className="text-xl font-bold text-center font-mono text-white mt-1">
                {formatTime(displayTime)}
              </h1>
            </div>
          </div>

          <button
            onClick={finishDrawing}
            className="font-poppins font-regular shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] bg-white w-[8vw] text-[14px] h-[3vw] rounded-xl text-black flex items-center justify-center"
          >
            Submit
          </button>
          {room?.host === playerID && room?.state === "waiting" ? (
            <button
              onClick={startRoom}
              className="font-poppins font-regular shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] bg-green-500 w-[8vw] text-[14px] h-[3vw] rounded-xl text-black flex items-center justify-center"
            >
              Start
            </button>
          ) : null}
        </div>
        <div className="flex w-full h-[70vw]">
          <Replicate />
        </div>
      </div>
      <Chat></Chat>
      <div className="flex flex-col"></div>
    </div>
  );
};

export default Draw;
