import "./App.css";
import CreateOrJoin from "./components/CreateOrJoin";

import Replicate from "./components/Replicate";

function App() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-blue-400">conartAI</h1>
      <Replicate />
      <CreateOrJoin />
    </div>
  )
}

export default App;
