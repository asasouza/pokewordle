import { GAME_STATUS, usePokeWordle } from "../../../contexts/PokeWordle";

const ShadowImage = (props) => {
  const [{ attempts, MAX_ATTEMPTS }, pokemon, { gameStatus }] = usePokeWordle();

  const artwork = pokemon?.sprites?.other["official-artwork"].front_default;

  const brightness =
    gameStatus === GAME_STATUS.IN_PROGRESS ? attempts.length / MAX_ATTEMPTS : 1;

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
    </div>
  );
};

export default ShadowImage;
