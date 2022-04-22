import { GAME_STATUS, usePokeWordle } from "../../../contexts/PokeWordle";

const ShadowImage = () => {
  const [{ attempts, MAX_ATTEMPTS }, pokemon, { gameStatus }] = usePokeWordle();

  const artwork = pokemon?.sprites?.other["official-artwork"].front_default;

  const brightness =
    gameStatus === GAME_STATUS.IN_PROGRESS ? attempts.length / MAX_ATTEMPTS : 1;

  const pokemonName = `${pokemon?.name[0].toUpperCase()}${pokemon?.name.slice(
    1
  )}`;

  if (!artwork) {
    return null;
  }

  return (
    <div className="w-1/3 h-1/4">
      <img
        src={artwork}
        alt="Misterious pokemon artwork"
        className="filter brightness-"
        style={{ filter: `brightness(${brightness})` }}
      />
      {gameStatus === GAME_STATUS.LOOSE && (
        <p>The Pokemon was: {pokemonName}</p>
      )}
    </div>
  );
};

export default ShadowImage;
