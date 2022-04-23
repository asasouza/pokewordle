import React, { useEffect, useState } from "react";
import { GAME_STATUS, usePokeWordle } from "../../../contexts/PokeWordle";

const Guesser = () => {
  const [attempt, setAttemp] = useState([]);
  const [{ addAttempt }, pokemon, { gameStatus }] = usePokeWordle();

  const pokemonName = pokemon?.name?.split("");

  const [inputsRef] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    addAttempt(attempt.join(""));
    setAttemp([]);
    inputsRef[0].focus();
  }

  function onChangeField(index, value) {
    const newAttempt = [...attempt];
    newAttempt[index] = value.replace(/\d/g, "").toUpperCase();
    setAttemp(newAttempt);

    const isLastInput = index === pokemonName.length - 1;
    if (!isLastInput) {
      inputsRef[index + 1].focus();
    }
  }

  if (!pokemonName || gameStatus !== GAME_STATUS.IN_PROGRESS) {
    return null;
  }

  // console.log(`inputsRef`, inputsRef);

  return (
    <>
      <form onSubmit={handleSubmit} className="flex justify-center">
        {pokemonName.map((_, i) => (
          <input
            name={`attempt-${i}`}
            key={i}
            maxLength={1}
            required
            className="border w-10 h-10 mr-2 rounded text-center caret-transparent focus:bg-gray-300"
            onChange={(e) => onChangeField(i, e.target.value)}
            value={attempt[i] || ""}
            autoFocus={i === 0}
            ref={(e) => (inputsRef[i] = e)}
          />
        ))}
        <input type="submit" value="submit" className="hidden" />
      </form>
    </>
  );
};

export default Guesser;
