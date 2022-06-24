import { Routes, Route } from "react-router-dom";
import { Game } from "./components/Game";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;
