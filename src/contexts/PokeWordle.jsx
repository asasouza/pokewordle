import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const PokeWordle = createContext();

function getRandomNuber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function usePokeWordle() {
  const context = useContext(PokeWordle);

  if (!context) {
    throw new Error("usePokeWordle must be used within an PokeWordleProvider");
  }

  return context;
}

export const MAX_ATTEMPTS = 5;

export const GAME_STATUS = Object.freeze({
  IN_PROGRESS: "IN_PROGRESS",
  WIN: "WIN",
  LOOSE: "LOOSE",
});

export function PokeWordleProvider(props) {
  const [attempts, setAttempts] = useState([]);
  const [pokemon, setPokemon] = useState(null);

  async function getPokemon() {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${getRandomNuber(1, 150)}`
    );
    setPokemon(response.data);
  }

  useEffect(() => {
    getPokemon();
  }, []);

  const getGameStatus = useCallback(() => {
    if (
      pokemon &&
      attempts[attempts?.length - 1]?.toLowerCase() ===
        pokemon?.name.toLowerCase()
    ) {
      return GAME_STATUS.WIN;
    } else if (attempts.length === MAX_ATTEMPTS) {
      return GAME_STATUS.LOOSE;
    }
    return GAME_STATUS.IN_PROGRESS;
  }, [attempts, pokemon]);

  const value = useMemo(() => {
    function initNewGame() {
      setAttempts([]);
      getPokemon();
    }

    function addAttempt(attempt) {
      if (attempts.length < MAX_ATTEMPTS) {
        return setAttempts((prevValue) => [...prevValue, attempt]);
      }
      throw new Error("max attempts reached");
    }

    const hasAttempts = attempts.length < MAX_ATTEMPTS;

    const gameStatus = getGameStatus();

    return [
      { attempts, addAttempt, hasAttempts, MAX_ATTEMPTS },
      pokemon,
      { gameStatus, initNewGame },
    ];
  }, [setAttempts, pokemon, attempts, getGameStatus]);

  return <PokeWordle.Provider value={value} {...props} />;
}
