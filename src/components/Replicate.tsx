import { FormEvent, useRef, useState, useEffect } from 'react';
import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas';

export default function Replicate() {
  const callReplicate = useAction(api.replicate.callReplicate);
  const [imageUrl, setImageUrl] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef<ReactSketchCanvasRef | null>(null);

  // State to manage responsive canvas size
  const [canvasSize, setCanvasSize] = useState({
    width: '70vw',
    height: '40vw',
  });

  // Update canvas size based on screen width
  const updateCanvasSize = () => {
    if (window.innerWidth < 640) {
      setCanvasSize({
        width: '100vw',
        height: '60vw',
      });
    } else {
      setCanvasSize({
        width: '70vw',
        height: '40vw',
      });
    }
  };

  useEffect(() => {
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

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
  };

  const undo = () => {
    if (!canvasRef.current) return;
    canvasRef.current.undo();
  };

  const reset = () => {
    if (!canvasRef.current) return;
    canvasRef.current.resetCanvas();
  };

  return (
    <div className="flex flex-col max-w-md md:ml-[2.5vw]">
      <ReactSketchCanvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height} 
        canvasColor="#191919"
        strokeColor="#ffffff"
        style={{ border: 'none' }}
      />
      <div className="absolute flex flex-row bottom-[550px] left-[150px] gap-3 md:bottom-[150px] md:left-[33.5vw]">
        <button onClick={undo}>undo</button>
        <button onClick={reset}>reset</button>
      </div>

      <form onSubmit={handleSubmit} className="w-full">
        <div className="gap-2">
          <input
            type="text"
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-[70vw] h-[4vw] mt-5 py-2 px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="A astronaut in the mountains... (required)"
          />
        </div>
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
    </div>
  );
}
