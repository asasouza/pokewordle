import { usePokeWordle } from "../../../contexts/PokeWordle";

const ShadowImage = (props) => {
  const [{ attempts, MAX_ATTEMPTS }, pokemon] = usePokeWordle();

  const artwork = pokemon?.sprites?.other["official-artwork"];

  const brightness = attempts.length / MAX_ATTEMPTS;

  if (!artwork) {
    return null;
  }

  return (
    <div className="w-1/3 h-1/4">
      <img
        src={pokemon.sprites.other["official-artwork"]}
        alt="Misterious pokemon artwork"
        className="filter brightness-"
        style={{ filter: `brightness(${brightness})` }}
      />
    </div>
  );
};

export default ShadowImage;
