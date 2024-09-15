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
  const playerID = usePlayerStore((state) => state.id);
  const navigate = useNavigate();
  const players = useQuery(api.player.roomPlayers, {
    code: gameCode,
  });

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  const displayTime = room?.state === "started" ? room?.scribbleTime : 0;

  const startRoom = async () => {
    await startGame({ code: gameCode });
  };
  const finishDrawing = async () => {
    await submitDrawing({ playerId: playerID, code: gameCode });
    await checkIfAllSubmitted({ code: gameCode });
  };

  useEffect(() => {
    if (room?.state === "rating" && players) {
      const allPlayersHaveImages = players.every(
        (player) => player.imageUrl && player.imageUrl !== "",
      );
      if (allPlayersHaveImages) {
        navigate(`/vote/${gameCode}`);
      }
    }
  }, [room?.state, players, gameCode, navigate]);

  useEffect(() => {
    if (room?.scribbleTime === 0) {
      navigate(`/vote/${gameCode}`);
    }
  }, [room?.scribbleTime]);

  return (
    <div className="flex flex-col md:flex-row w-screen h-screen bg-black">
      <div className="flex bg-black flex-col w-full md:w-[75%]">
        <div className="flex flex-col md:flex-row justify-center md:justify-start w-full gap-5 py-5 px-4 md:px-0">
          <div className="hidden md:block">
            <Logo />
          </div>
          <div className="flex flex-row gap-2 justify-center items-center w-full md:w-auto md:ml-[15vw]">
            <div className="w-full md:w-[9vw] shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] bg-[#191919] h-12 md:h-[3vw] rounded-xl flex items-center justify-center">
              <h1 className="text-xl font-bold text-center font-mono text-white">
                {formatTime(displayTime)}
              </h1>
            </div>
            <button
              onClick={finishDrawing}
              className="font-poppins hover:opacity-[60%] w-full md:w-[8vw] h-12 md:h-[3vw] font-regular shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] bg-white text-[14px] rounded-xl text-black flex items-center justify-center"
            >
              Submit
            </button>
            {room?.host === playerID && (
              <button
                onClick={startRoom}
                className="font-poppins hover:opacity-[60%] w-full md:w-[8vw] h-12 md:h-[3vw] font-regular shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] bg-green-500 text-[14px] rounded-xl text-black flex items-center justify-center"
              >
                Start
              </button>
            )}
          </div>
        </div>
        <div className="flex w-full h-[70vh] md:h-[70vw]">
          <Replicate />
        </div>
        <div className="md:hidden mt-4">
          <Chat />
        </div>
      </div>
      <div className="hidden md:block md:w-[25%]">
        <Chat />
      </div>
    </div>
  );
};

export default Draw;
