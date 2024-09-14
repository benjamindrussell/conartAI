import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const GameRoom = () => {
  let { gameCode } = useParams();
  if (!gameCode) return;
  const room = useQuery(api.room.getRoom, { code: gameCode });

  const players = useQuery(api.player.roomPlayers, { code: gameCode });
  const startGame = useMutation(api.room.startRoomGame);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        Game Room
      </h1>
      <h2 className="text-xl font-semibold mb-2 text-center text-black">
        {room?.time}
      </h2>
      <button
        onClick={() => startGame({ code: gameCode })}
        className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Start Game
      </button>
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-2 text-center">Game Code</h2>
        <p className="text-4xl font-bold text-center text-indigo-500">
          {gameCode}
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Players</h2>
        {players?.length === 0 ? (
          <p className="text-gray-500 text-center">
            Waiting for players to join...
          </p>
        ) : (
          <ul className="space-y-2">
            {players?.map((player) => (
              <li className="bg-indigo-100 text-black p-2 rounded">
                {player.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GameRoom;
