import { useEffect, useRef, useState } from "react";
import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import BackIcon from "./icons/BackIcon";
import CrossIcon from "./icons/CrossIcon";
import { usePlayerStore } from "../store.ts";
import { updatePlayerImgUrl } from "../../convex/player.ts";

export default function Replicate() {
  const callReplicate = useAction(api.replicate.callReplicate);
  const [imageUrl, setImageUrl] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const playerID = usePlayerStore((state) => state.id);
  const canvasRef = useRef<ReactSketchCanvasRef | null>(null);
  const player = useQuery(api.player.getPlayer, { playerId: playerID });
  const updatePlayerImgUrl = useMutation(api.player.updatePlayerImgUrl);

  useEffect(() => {
    const makeImage = async () => {
      if (!prompt.trim() || !canvasRef.current) return;
      setIsLoading(true);
      try {
        const image = await canvasRef.current.exportImage("png");
        console.log(image);
        const result = await callReplicate({
          prompt: prompt.trim(),
          scribble: image,
        });
        console.log("result: ", result);
        const url = (result as unknown as string[])[0]
        updatePlayerImgUrl({
          playerId: playerID,
          imageUrl: url
        });
        setImageUrl(result as unknown as string);
      } catch (error) {
        console.error("Error calling Replicate:", error);
      } finally {
        setIsLoading(false);
      }
    };

    makeImage();
  }, [player?.hasSubmitted]);

  const undo = () => {
    if (!canvasRef.current) return;
    canvasRef.current.undo();
  };

  const reset = () => {
    if (!canvasRef.current) return;
    canvasRef.current.resetCanvas();
  };

  const handleNewDrawing = () => {
    setImageUrl("");
  };

  return (
    <div className="flex flex-col md:ml-[0] ml-[13vw] w-[70vw]">
      <div className="flex flex-col items-center bg-transparent md:bg-[#191919] rounded-xl">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Generated image"
            className="w-[512px] h-[512px] rounded-md shadow-lg object-cover"
          />
        ) : (
          <ReactSketchCanvas
            ref={canvasRef}
            width="512px"
            height="512px"
            canvasColor="#191919"
            strokeColor="#ffffff"
          />
        )}
        <div className="flex gap-4 mt-6 absolute top-[520px]">
          <button
            onClick={undo}
            className="bg-teal-600 flex justify-center items-center rounded-full pr-1.5 pb-1.5"
            disabled={!!imageUrl}
          >
            <BackIcon width={30} height={30} />
          </button>
          <button
            onClick={reset}
            className=" bg-teal-600 flex justify-center items-center rounded-full px-[3px]"
            disabled={!!imageUrl}
          >
            <CrossIcon width={30} height={30} />
          </button>
          {imageUrl && (
            <button
              onClick={handleNewDrawing}
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
            >
              New Drawing
            </button>
          )}
        </div>
      </div>
      <form className="w-full">
        <div className="gap-2">
          <input
            type="text"
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="md:w-full ml-[-8vw] md:ml-[0] w-[90vw] h-[50px] md:h-[4vw] mt-5 py-2 px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="An astronaut in the mountains... (required)"
          />
        </div>
      </form>
    </div>
  );
}
