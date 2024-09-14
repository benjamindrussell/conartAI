import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateRoomCode } from "../logic";

const RoomComponent = () => {
  const [createRoomCode, setCreateRoomCode] = useState("");
  const [joinRoomCode, setJoinRoomCode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setCreateRoomCode(generateRoomCode());
  }, []);

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Joining room:", joinRoomCode);
  };

  const handleCreateRoom = () => {
    console.log("Creating a new room");
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
