import { usePokeWordle } from "../../../contexts/PokeWordle";

const Attempts = () => {
  const [{ attempts }, pokemon] = usePokeWordle();

  const pokemonName = pokemon?.name.toUpperCase().split("");

  function getBackground(letter, index) {
    console.log(pokemonName, letter);
    if (letter === pokemonName[index]) {
      return "bg-green-400";
    }
    if (pokemonName.includes(letter)) {
      return "bg-yellow-400";
    }
    return "bg-gray-400";
  }

  return attempts.map((attempt, i) => {
    const attemptArr = attempt.split("");
    return (
      <div className="flex mb-3" key={`attempt-${i}`}>
        {attemptArr.map((letter, y) => {
          return (
            <span
              className={`border w-10 h-10 mr-2 rounded text-center align-text-bottom ${getBackground(
                letter,
                y
              )}`}
              key={y}
            >
              {letter}
            </span>
          );
        })}
      </div>
    );
  });
};

export default Attempts;
