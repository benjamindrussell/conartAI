import { useQuery } from "convex/react";
import { useParams } from "react-router";
import { api } from "../../convex/_generated/api";

const Podium = () => {
  const { gameCode } = useParams<{ gameCode: string }>();
  if (!gameCode) return null;
  const players = useQuery(api.player.roomPlayers, { code: gameCode }) || [];
  // Calculate average rating for each player
  const playersWithAverageRating = players.map((player) => ({
    ...player,
    averageRating:
      player.ratings.reduce((sum, r) => sum + r.rating, 0) /
        player.ratings.length || 0,
  }));

  // Sort players by average rating and get top 3
  const topPlayers = playersWithAverageRating
    .sort((a, b) => b.averageRating - a.averageRating)
    .slice(0, 3);

  const getRankClass = (index: number) => {
    switch (index) {
      case 0:
        return "order-2 w-48 h-48";
      case 1:
        return "order-1 w-40 h-40";
      case 2:
        return "order-3 w-32 h-32";
      default:
        return "";
    }
  };

  const getPodiumHeight = (index: number) => {
    switch (index) {
      case 0:
        return "h-40";
      case 1:
        return "h-36";
      case 2:
        return "h-32";
      default:
        return "";
    }
  };

  return (
    <div className="bg-gray-900 w-screen h-screen text-white font-poppins">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-10">Top 3 Players</h1>
        <div className="flex items-end justify-center gap-4 mb-8">
          {topPlayers.map((player, index) => (
            <div key={player._id} className="flex flex-col items-center">
              <img
                src={player.imageUrl}
                alt={player.name}
                className={`rounded-t-lg mb-2 object-cover ${getRankClass(index)}`}
              />
              <div
                className={`w-40 bg-gray-800 rounded-b-lg p-4 flex flex-col items-center ${getPodiumHeight(index)}`}
              >
                <span className="text-2xl font-bold mb-2">{index + 1}</span>
                <span className="text-xl mb-2">{player.name}</span>
                <span className="text-lg text-yellow-400">
                  {player.averageRating.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Podium;
