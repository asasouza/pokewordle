import { render, screen } from "@testing-library/react";
import {
  GAME_STATUS,
  PokeWordleProvider,
} from "../../../../contexts/PokeWordle";
import ShadowImage from "../ShadowImage";

describe("Componente de imagem", () => {
  function renderWithAttempts(
    attempts,
    maxAttemptsNumber,
    gameStatus = GAME_STATUS.IN_PROGRESS
  ) {
    render(
      <PokeWordleProvider
        value={[
          { attempts, MAX_ATTEMPTS: maxAttemptsNumber },
          {
            name: "BULBASAUR",
            sprites: {
              other: {
                "official-artwork": {
                  front_default:
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
                },
              },
            },
          },
          { gameStatus },
        ]}
      >
        <ShadowImage />
      </PokeWordleProvider>
    );
  }
  test("Deve exibir a imagem sem brilho no começo das tentativas", () => {
    renderWithAttempts([], 5);

    const image = screen.getByRole("img", {
      name: /misterious pokemon artwork/i,
    });
    expect(image).toBeInTheDocument();

    expect(image).toHaveStyle("filter: brightness(0)");
  });

  test("Deve exibir a imagem sem filtro ao final das tentativas", () => {
    renderWithAttempts(["attempt"], 1);

    const image = screen.getByRole("img", {
      name: /misterious pokemon artwork/i,
    });
    expect(image).toBeInTheDocument();

    expect(image).toHaveStyle("filter: brightness(1)");
  });

  test("Deve exibir a imagem sem filtro ao acertar o Pokemon", () => {
    renderWithAttempts(["BULBASAUR"], 5, GAME_STATUS.WIN);

    const image = screen.getByRole("img", {
      name: /misterious pokemon artwork/i,
    });
    expect(image).toBeInTheDocument();

    expect(image).toHaveStyle("filter: brightness(1)");
  });
});
