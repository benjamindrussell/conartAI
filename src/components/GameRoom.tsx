import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { usePlayerStore } from "../store.ts";

const GameRoom = () => {
  let { gameCode } = useParams();
  if (!gameCode) return null;

  const room = useQuery(api.room.getRoom, { code: gameCode });
  const players = useQuery(api.player.roomPlayers, { code: gameCode });
  const startGame = useMutation(api.room.startRoomGame);
  const playerID = usePlayerStore((state) => state.id);
  const ratePlayers = useMutation(api.player.ratePlayers);

  const handleRating = async (playerId: string, rating: number) => {
    await ratePlayers({
      code: gameCode,
      playerId: playerId,
      playerRated: playerID,
      rating: rating,
    });
  };

  const displayTime =
    room?.state === "started"
      ? room?.scribbleTime
      : room?.state === "rating"
        ? room?.ratingTime
        : null;

  const startRoom = async () => {
    await startGame({ code: gameCode });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        Game Room
      </h1>
      <h2 className="text-xl font-semibold mb-2 text-center text-black">
        {displayTime}
      </h2>
      <h2 className="text-xl font-semibold mb-2 text-center text-black">
        {room?.state}
      </h2>
      {room?.host === playerID && (
        <button
          onClick={() => startRoom()}
          className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Start Game
        </button>
      )}
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
              <li
                key={player._id}
                className="bg-indigo-100 text-black p-2 rounded flex justify-between items-center"
              >
                <span>{player.name}</span>
                {player._id !== playerID && room?.state === "rating" && (
                  <select
                    onChange={(e) =>
                      handleRating(player._id, parseInt(e.target.value))
                    }
                    className="ml-2 p-1 rounded bg-white"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Rate
                    </option>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <option key={rating} value={rating}>
                        {rating}
                      </option>
                    ))}
                  </select>
                )}
                {room?.state === "review" && (
                  <h4 className="text-xl font-semibold mb-2 text-center text-black">
                    {player.ratings
                      .map((rating) => rating.rating)
                      .reduce((a, b) => a + b, 0) / player.ratings.length}
                  </h4>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GameRoom;
