import { usePokeWordle } from "../../../contexts/PokeWordle";

const Attempts = () => {
  const [{ attempts }, pokemon] = usePokeWordle();

  const pokemonName = pokemon?.name.toUpperCase().split("");

  function getBackground(letter, index) {
    if (letter === pokemonName[index]) {
      return "bg-green-500";
    }
    if (pokemonName.includes(letter)) {
      return "bg-yellow-500";
    }
    return "bg-zinc-400";
  }

  return (
    <div>
      {attempts.map((attempt, i) => {
        const attemptArr = attempt.split("");
        return (
          <div className="flex mb-2" key={`attempt-${i}`}>
            {attemptArr.map((letter, y) => {
              return (
                <span
                  className={`border-2 text-zinc-800 text-2xl border-zinc-800 flex items-center justify-center w-10 h-10 mr-2 rounded align-text-bottom ${getBackground(
                    letter,
                    y
                  )}`}
                  key={y}
                  data-testid="attempt-letter"
                >
                  <p>{letter}</p>
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Attempts;
