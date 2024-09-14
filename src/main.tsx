import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import Index from "./pages/Index.tsx";
import CreateRoom from "./pages/CreateRoom.tsx";
import JoinRoom from "./pages/JoinRoom.tsx";
import Draw from "./pages/Draw.tsx";
import Vote from "./pages/Vote.tsx";
import "./index.css";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import GameRoom from "./components/GameRoom.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);
const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/game/:gameCode",
    element: <GameRoom />,
  },
  {
    path: "/create",
    element: <CreateRoom />,
  },
  {path: "/join", 
    element: <JoinRoom />},
  {
    path:"/test",
    element: <App />,
  },
  { path: "/draw",
    element: <Draw />,
  },
  {path: "/vote",
    element: <Vote />},

]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConvexProvider client={convex}>
      <RouterProvider router={router} />
    </ConvexProvider>
  </StrictMode>,
);
