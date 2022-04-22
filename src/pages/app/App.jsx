import React from "react";
import { GAME_STATUS, usePokeWordle } from "../../contexts/PokeWordle";
import Attempts from "./components/Attempts";
import Guesser from "./components/Guesser";
import ShadowImage from "./components/ShadowImage";

const App = () => {
  const [, , { initNewGame, gameStatus }] = usePokeWordle();
  
  return (
    <div className="bg-gray-100 flex flex-col items-center h-screen max-w-md mx-auto overflow-x-hidden p-4 relative">
      <ShadowImage />

      <Attempts />

      <Guesser />

      {gameStatus === GAME_STATUS.WIN && (
        <p>Congrats, you're a true Pokemon master. Play again!</p>
      )}

      {gameStatus === GAME_STATUS.LOOSE && (
        <p>Sorry, but you do not guess the Pokemon</p>
      )}

      {gameStatus !== GAME_STATUS.IN_PROGRESS && (
        <button
          className="w-full font-bold text-stone-600 rounded-md p-1 border-2 border-stone-600 my-10"
          onClick={initNewGame}
        >
          Play Again
        </button>
      )}
    </div>
  );
};

export default App;
