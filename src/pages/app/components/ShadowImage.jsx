import { GAME_STATUS, usePokeWordle } from "../../../contexts/PokeWordle";

const ShadowImage = () => {
  const [{ attempts, MAX_ATTEMPTS }, pokemon, { gameStatus }] = usePokeWordle();

  const artwork = pokemon?.sprites?.front_default;

  const brightness =
    gameStatus === GAME_STATUS.IN_PROGRESS ? attempts.length / MAX_ATTEMPTS : 1;

  const pokemonName = `${pokemon?.name[0].toUpperCase()}${pokemon?.name.slice(
    1
  )}`;

  return (
    <div className="w-56 mb-5 px-5 bg-stone-300 rounded-md border-2 border-zinc-800 flex flex-col items-center before:conten">
      <div className="flex my-1">
        <div className="bg-red-500 w-2 h-2 rounded-full border-2 border-zinc-800 mr-3"></div>
        <div className="bg-red-500 w-2 h-2 rounded-full border-2 border-zinc-800"></div>
      </div>

      <div className="w-full h-30 bg-zinc-600 border-2 border-zinc-800 rounded flex flex-col items-center mb-4">
        {artwork && (
          <img
            src={artwork}
            alt="Misterious pokemon artwork"
            className="mt-3"
            style={{ filter: `brightness(${brightness})` }}
          />
        )}

        <a
          className="text-white text-3xl"
          href={`https://react-typescript-pokedex.herokuapp.com/${pokemonName.toLowerCase()}`}
          target="_blank"
          rel="noreferrer"
        >
          {gameStatus !== GAME_STATUS.IN_PROGRESS ? pokemonName : ""}
        </a>
      </div>
    </div>
  );
};

export default ShadowImage;
