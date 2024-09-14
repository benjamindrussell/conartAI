import { FormEvent, useRef, useState } from 'react';
import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas';

export default function Replicate() {
  const callReplicate = useAction(api.replicate.callReplicate);
  const [imageUrl, setImageUrl] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef<ReactSketchCanvasRef | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || !canvasRef.current) return;

    setIsLoading(true);
    try {
      const image = await canvasRef.current.exportImage("png");
      console.log(image);
      const result = await callReplicate({ prompt: prompt.trim(), scribble: image });
      setImageUrl(result as unknown as string);
    } catch (error) {
      console.error("Error calling Replicate:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const undo = () => {
    if (!canvasRef.current) return;
    canvasRef.current.undo();
  };

  const reset = () => {
    if (!canvasRef.current) return;
    canvasRef.current.resetCanvas();
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col gap-2">
          <label htmlFor="prompt" className="font-medium text-gray-700">
            Enter your image prompt:
          </label>
          <input
            type="text"
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="A serene landscape with mountains..."
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Generating...' : 'Generate Image'}
        </button>
      </form>
      {imageUrl && (
        <div className="mt-6 w-full">
          <img
            src={imageUrl}
            alt="Generated image"
            className="w-full h-auto rounded-md shadow-lg"
          />
        </div>
      )}
      <ReactSketchCanvas
        ref={canvasRef}
        width="512px"
        height="512px"
        canvasColor="#000000"
        strokeColor="#ffffff"
      />
      <button onClick={undo}>undo</button>
      <button onClick={reset}>reset</button>
    </div>
  )
}