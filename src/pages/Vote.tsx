import React, { useState, useEffect } from "react";
import Logo from "../components/Logo";
import { useMutation, useQuery } from "convex/react";
import { usePlayerStore } from "../store";
import { api } from "../../convex/_generated/api";
import { useNavigate, useParams } from "react-router";

type Player = {
  _id: string & { _tableName: "players" };
  _creationTime: number;
  name: string;
  hasSubmitted: boolean;
  roomCode: string;
  imageUrl: string;
  ratings: {
    playerId: string;
    rating: number;
  }[];
};

const Vote: React.FC = () => {
  const { gameCode } = useParams<{ gameCode: string }>();
  if (!gameCode) return null;

  const players = useQuery(api.player.roomPlayers, { code: gameCode }) as
    | Player[]
    | undefined;
  const id = usePlayerStore((state) => state.id);
  const ratePlayers = useMutation(api.player.ratePlayers);
  const setRoomState = useMutation(api.room.setRoomState);
  const checkIfAllPlayersVoted = useQuery(api.room.checkIfAllPlayersVoted, {
    code: gameCode,
  });
  const navigate = useNavigate();

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (players && currentPlayerIndex >= players.length) {
      handleFinishVoting();
    }
  }, [currentPlayerIndex, players]);

  useEffect(() => {
    if (checkIfAllPlayersVoted) {
      navigate(`/podium/${gameCode}`);
    }
  }, [checkIfAllPlayersVoted]);

  const handleRatingClick = async (rating: number): Promise<void> => {
    if (!players || !gameCode) return;

    setSelectedRating(rating);
    setError(null);
    setIsSubmitting(true);

    try {
      const currentPlayer = players[currentPlayerIndex];
      console.log("current player: ", currentPlayer);
      console.log(
        `Submitting rating for player ${currentPlayer._id}: ${rating}`,
      );
      const result = await ratePlayers({
        code: gameCode,
        playerId: currentPlayer._id, // ID of the player giving the rating
        playerRated: id,
        rating: rating,
      });
      console.log(`Rating submission result:`, result);

      // Move to the next player
      setCurrentPlayerIndex((prevIndex) => prevIndex + 1);
      setSelectedRating(0);
    } catch (err) {
      console.error("Error submitting rating:", err);
      // setError(`Failed to submit rating: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinishVoting = async (): Promise<void> => {
    if (!gameCode) return;

    try {
      console.log("Finishing voting, updating room state");
      const roomStateResult = await setRoomState({
        code: gameCode,
        state: "results",
      });
      console.log(`Room state update result:`, roomStateResult);
    } catch (err) {
      console.error("Error updating room state:", err);
      // setError(`Failed to finish voting: ${err.message}`);
    }
  };

  if (!gameCode || !players || currentPlayerIndex >= players.length)
    return null;

  const currentPlayer = players[currentPlayerIndex];

  return (
    <div className="flex flex-row w-screen h-screen bg-black">
      <div className="flex bg-black flex-col w-[75%]">
        <div className="mt-[1.5vw]">
          <Logo />
        </div>
        <div className="flex w-full mt-[5vw]">
          <div className="w-[60vw] bg-[#2b2b2b] h-[40vw] ml-10 rounded-2xl flex items-center justify-center">
            <img
              src={currentPlayer.imageUrl}
              alt={`Player ${currentPlayer.name}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
        <div className="flex flex-col items-center mt-[2vw]">
          <ul className="flex flex-row justify-center items-center gap-11 mb-4">
            {[1, 2, 3, 4, 5].map((rating) => (
              <li
                key={rating}
                className={`w-[50px] h-[50px] flex justify-center items-center rounded-full ${
                  selectedRating === rating
                    ? "bg-white text-black"
                    : "bg-[#5C5C5C]"
                } hover:bg-white hover:cursor-pointer hover:text-black`}
                onClick={() => handleRatingClick(rating)}
              >
                {rating}
              </li>
            ))}
          </ul>
          <p className="text-white mt-2">
            Rating player {currentPlayerIndex + 1} of {players.length}
          </p>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {isSubmitting && (
            <p className="text-yellow-500 mt-2">Submitting rating...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Vote;

