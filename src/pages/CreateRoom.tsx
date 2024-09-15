import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Region from "../components/Region";
import { useNavigate } from "react-router";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { usePlayerStore } from "../store.ts";
import { generateRoomCode } from "../utils.ts";

const CreateRoom: React.FC = () => {
  const [createRoomCode, setCreateRoomCode] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const createRoom = useMutation(api.room.createRoom);
  const joinRoom = useMutation(api.player.joinRoom);
  const setPlayerID = usePlayerStore((state) => state.setPlayerID);

  useEffect(() => {
    setCreateRoomCode(generateRoomCode());
  }, []);

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      console.log("Please enter a name");
      return;
    }
    const playerID = await joinRoom({ code: createRoomCode, name: name });
    await createRoom({
      code: createRoomCode,
      prompt: "womp womp",
      playerID: playerID,
    });
    setPlayerID(playerID);
    navigate(`/game/${createRoomCode}`);
  };

  return (
    <div className="w-screen h-screen bg-black overflow-hidden">
      <Navbar />
      <div className="flex items-center justify-center h-full">
        <div className="w-[55vw] h-[25vw] bg-white bg-opacity-[10%] rounded-xl">
          <Region></Region>
          <div className="flex flex-col gap-8 justify-center w-full h-full items-center">
            <form onSubmit={handleCreateRoom}>
              <div className="relative">
                <input
                  className="bg-[#303030] px-2 w-[35vw] h-[4vw] rounded-2xl placeholder:absolute placeholder:text-[10px] placeholder:top-2 placeholder:left-3 placeholder:text-white"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <button className="px-7 rounded-2xl py-3 w-[25vw] bg-white text-[#2b2b2b]">
                Create Room
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;

