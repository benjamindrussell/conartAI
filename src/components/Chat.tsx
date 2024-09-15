import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { usePlayerStore } from "../store.ts";

export default function Chat() {
  console.log("chat logged");
  // TODO: don't hard code this
  let { gameCode } = useParams();
  if (!gameCode) return null;

  const room = useQuery(api.room.getRoom, { code: gameCode });
  const players = useQuery(api.player.roomPlayers, { code: gameCode }) || [];
  const id = usePlayerStore((state) => state.id);
  const ratePlayers = useMutation(api.player.ratePlayers);
  const setRoomState = useMutation(api.room.setRoomState);
  
  const [message, setMessage] = useState("");
  const uploadMessage = useMutation(api.chat.uploadMessage);
  const messages = useQuery(api.chat.getMessages, { code: gameCode }) || [];
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === "") return;

    try {
      await uploadMessage({
        messengerId: id,
        content: message,
        roomCode: gameCode,
      });
      setMessage("");
    } catch (error) {
      console.error("Error uploading message:", error);
    }
  };

  const getPlayerName = (messengerId: string) => {
    const player = players.find(p => p._id === messengerId);
    console.log("player: ", player);
    return player ? player.name : "Unknown Player";
  };

  return (
    <div className="w-[25vw] bg-[#191919] flex flex-col rounded-xl ">
      <div className="bg-teal-600 rounded-t-xl pt-4 px-4">
        <h1 className="text-xl font-bold mb-4">Room Code: {gameCode}</h1>
      </div>
      <div className="flex-grow overflow-y-auto mb-4 flex flex-col-reverse mx-4">
        <div ref={messagesEndRef} />
        {messages.slice().reverse().map((msg, index) => (
          <div 
            key={index} 
            className={`mb-2 p-2 rounded-lg ${
              msg.messengerId === id ? "bg-teal-600 text-white self-end" : "bg-white text-black self-start"
            }`}
          >
            <p className="text-xs font-bold">{getPlayerName(msg.messengerId)}</p>
            <p>{msg.content}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="mt-auto mx-4 mb-4">
        <input
          type="text"
          value={message}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="w-full p-2 rounded-md"
        />
        <button
          type="submit"
          className="mt-2 w-full bg-teal-500 text-white p-2 rounded-md hover:bg-teal-600"
        >
          Send
        </button>
      </form>
    </div>
  );
}