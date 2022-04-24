import { GAME_STATUS, usePokeWordle } from "../../../contexts/PokeWordle";

const GameStatusMessage = () => {
  const [, , { initNewGame, gameStatus }] = usePokeWordle();

  function getMessage() {
    switch (gameStatus) {
      case GAME_STATUS.WIN:
        return "Congrats, you're a true Pokemon master.";
      case GAME_STATUS.LOOSE:
        return "Sorry, but you do not guess the Pokemon.";
      default:
        return "";
    }
  }
  return (
    <div className="mt-3 w-full text-center">
      <p className="text-white text-2xl">{getMessage()}</p>
      {gameStatus !== GAME_STATUS.IN_PROGRESS && (
        <button
          className="text-white rounded-md p-1 bg-zinc-800 my-5 px-5 py-2 text-lg"
          onClick={initNewGame}
        >
          PLAY AGAIN
        </button>
      )}
    </div>
  );
};

export default GameStatusMessage;
