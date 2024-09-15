import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateRoomCode } from "../utils.ts";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { usePlayerStore } from "../store.ts";

const RoomComponent = () => {
  const [createRoomCode, setCreateRoomCode] = useState("");
  const [joinRoomCode, setJoinRoomCode] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const createRoom = useMutation(api.room.createRoom);
  const joinRoom = useMutation(api.player.joinRoom);
  const setPlayerID = usePlayerStore((state) => state.setPlayerID);

  useEffect(() => {
    setCreateRoomCode(generateRoomCode());
  }, []);

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

  const handleCreateRoom = async () => {
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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Join or Create a Room
      </h2>

      <form onSubmit={handleJoinRoom} className="mb-6">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            value={joinRoomCode}
            onChange={(e) => setJoinRoomCode(e.target.value)}
            placeholder="Enter room code"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={4}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Join Room
          </button>
        </div>
      </form>

      <div className="text-center">
        <button
          onClick={handleCreateRoom}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Create New Room
        </button>
      </div>
    </div>
  );
};

export default RoomComponent;
