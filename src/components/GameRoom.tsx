import { useState } from "react";
import { Player } from "../types";
import { useParams } from "react-router-dom";

const GameRoom = () => {
  const [players, setPlayers] = useState([] as Player[]);
  const [playerName, setPlayerName] = useState("");
  let { gameCode } = useParams();
  const addPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim() && players.length < 8) {
      setPlayers([...players, { id: Date.now(), name: playerName.trim() }]);
      setPlayerName("");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        Game Room
      </h1>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-2 text-center">Game Code</h2>
        <p className="text-4xl font-bold text-center text-indigo-500">
          {gameCode}
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Players</h2>
        {players.length === 0 ? (
          <p className="text-gray-500 text-center">
            Waiting for players to join...
          </p>
        ) : (
          <ul className="space-y-2">
            {players.map((player) => (
              <li key={player.id} className="bg-indigo-100 p-2 rounded">
                {player.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <form onSubmit={addPlayer} className="flex space-x-2">
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter your name"
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Join
        </button>
      </form>

      {players.length >= 8 && (
        <p className="mt-4 text-red-500 text-center">
          Maximum number of players reached.
        </p>
      )}
    </div>
  );
};

export default GameRoom;
