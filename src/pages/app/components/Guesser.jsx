import React, { useState } from "react";
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

    if (value !== "") {
      const isLastInput = index === pokemonName.length - 1;
      if (!isLastInput) {
        inputsRef[index + 1].focus();
      }
    }
  }

  function onDelete(index, event) {
    const isEmptyLetter = !attempt[index] || attempt[index] === "";
    if (event.code === "Backspace" && isEmptyLetter) {
      const isFirstInput = index === 0;
      if (!isFirstInput) {
        inputsRef[index - 1].focus();
      }
    }
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
            className="border-2 text-zinc-800 border-zinc-800 w-10 h-10 mr-2 rounded text-center caret-transparent bg-gray-50 focus:bg-gray-300 outline-none text-2xl"
            onChange={(e) => onChangeField(i, e.target.value)}
            onKeyDown={(e) => onDelete(i, e)}
            value={attempt[i] || ""}
            autoFocus={i === 0}
            ref={(e) => (inputsRef[i] = e)}
            /* TECH TALK -- EXEMPLO FIREEVENT X USEREVENT */
            // disabled
          />
        ))}
        <input type="submit" value="submit" className="hidden" />
      </form>
    </>
  );
};

export default Guesser;
