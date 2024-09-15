import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Region from "../components/Region";
import { useNavigate } from "react-router";
import { useMutation } from "convex/react";
import { usePlayerStore } from "../store.ts";
import { api } from "../../convex/_generated/api";

const JoinRoom: React.FC = () => {
  const [joinRoomCode, setJoinRoomCode] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const joinRoom = useMutation(api.player.joinRoom);
  const setPlayerID = usePlayerStore((state) => state.setPlayerID);

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      console.log("Please enter a name");
      return;
    }
    if (!joinRoomCode) {
      console.log("Please enter a room code");
      return;
    }
    console.log("Joining room:", joinRoomCode);

    const playerID = await joinRoom({ code: joinRoomCode, name: name });
    setPlayerID(playerID);
    navigate(`/game/${joinRoomCode}`);
  };

  return (
    <div className="w-screen h-screen bg-black overflow-hidden">
      <Navbar />
      <div className="flex items-center justify-center h-full">
        <div className="w-[55vw] h-[25vw] bg-white bg-opacity-[10%] rounded-xl">
          <Region />
          <div className="flex flex-col gap-8 justify-center w-full h-full items-center">
            <form onSubmit={handleJoinRoom}>
              <div className="flex flex-col gap-3">
                <div className="relative">
                  <input
                    className="bg-[#303030] px-2 w-[35vw] h-[4vw] rounded-2xl placeholder:absolute placeholder:text-[10px] placeholder:top-2 placeholder:left-3 placeholder:text-white"
                    type="text"
                    placeholder="Name"
                    name={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <input
                    className="bg-[#303030] px-2 w-[35vw] h-[4vw] rounded-2xl placeholder:absolute placeholder:text-[10px] placeholder:top-2 placeholder:left-3 placeholder:text-white"
                    type="text"
                    placeholder="Room Code"
                    name={joinRoomCode}
                    onChange={(e) => setJoinRoomCode(e.target.value)}
                  />
                </div>
              </div>
              <button className="px-7 rounded-2xl py-3 w-[25vw] bg-white text-[#2b2b2b]">
                Join Room
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;

