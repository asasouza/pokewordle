import { useState } from "react";
import { GAME_STATUS, usePokeWordle } from "../../../contexts/PokeWordle";

const Guesser = () => {
  const [attempt, setAttemp] = useState([]);
  const [{ addAttempt }, pokemon, { gameStatus }] = usePokeWordle();

  const pokemonName = pokemon?.name?.split("");

  function handleSubmit(e) {
    e.preventDefault();
    addAttempt(attempt.join(""));
    setAttemp([]);
  }

  function onChangeField(index, value) {
    const newAttempt = [...attempt];
    newAttempt[index] = value.replace(/\d/g, "").toUpperCase();
    setAttemp(newAttempt);
  }

  if (!pokemonName || gameStatus !== GAME_STATUS.IN_PROGRESS) {
    return null;
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex justify-center">
        {pokemonName.map((_, i) => (
          <input
            name={`attempt-${i}`}
            key={i}
            maxLength={1}
            required
            className="border w-10 h-10 mr-2 rounded"
            onChange={(e) => onChangeField(i, e.target.value)}
            value={attempt[i] || ""}
          />
        ))}
        <input type="submit" value="submit" className="hidden" />
      </form>
    </>
  );
};

export default Guesser;
