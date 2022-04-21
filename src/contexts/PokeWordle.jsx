import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const PokeWordle = createContext();

export function usePokeWordle() {
  const context = useContext(PokeWordle);

  if (!context) {
    throw new Error("usePokeWordle must be used within an PokeWordleProvider");
  }

  return context;
}

const MAX_ATTEMPTS = 5;

export const GAME_STATUS = Object.freeze({
  IN_PROGRESS: "IN_PROGRESS",
  WIN: "WIN",
  LOOSE: "LOOSE",
});

export function PokeWordleProvider(props) {
  const [attempts, setAttempts] = useState([]);
  const [pokemon, setPokemon] = useState(null);
  //   const [gameStatus, setGameStatus] = useState(GAME_STATUS.IN_PROGRESS);

  function getPokemon() {
    setPokemon({
      name: "qwer",
      id: 1,
      sprites: {
        other: {
          "official-artwork":
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
        },
      },
    });
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
