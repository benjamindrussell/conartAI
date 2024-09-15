import "./App.css";
import Chat from "./components/Chat";
import CreateOrJoin from "./components/CreateOrJoin";
import Replicate from "./components/Replicate";

function App() {
  return (
    <div className="flex flex-col items-center font-poppins">
      <h1 className="text-blue-400">conartAI</h1>
      <Replicate />
      <div className="flex">
        <Chat />
        <CreateOrJoin />
      </div>
    </div>
  )
}

export default App;
