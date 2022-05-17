import { render, screen } from "@testing-library/react";
import { PokeWordleProvider } from "../../../../contexts/PokeWordle";

import Attempts from "../Attempts";

describe("Attempts", () => {
  function renderWithAttempts(attempt) {
    render(
      <PokeWordleProvider
        value={[{ attempts: [attempt] }, { name: "BULBASAUR" }]}
      >
        <Attempts />
      </PokeWordleProvider>
    );
  }

  test("Ao acertar todas as letras", () => {
    // renderiza o componente
    renderWithAttempts("BULBASAUR");

    // busca pelo data-testid
    const attemptLetters = screen.getAllByTestId("attempt-letter");
    expect(attemptLetters.length).toBe(9);

    // verifica que todos as leras tem a classe correta
    attemptLetters.forEach((letter) => {
      expect(letter).toHaveClass("bg-green-500");
    });
  });

  test("Ao errar todas as letras", () => {
    // renderiza o componente
    renderWithAttempts("XXYYZZWWK");

    // busca pelo data-testid
    const attemptLetters = screen.getAllByTestId("attempt-letter");
    expect(attemptLetters.length).toBe(9);

    // verifica que todos as leras tem a classe correta
    attemptLetters.forEach((letter) => {
      expect(letter).toHaveClass("bg-zinc-400");
    });
  });

  test("Ao inserir todas as letras na ordem errada", () => {
    // renderiza o componente
    renderWithAttempts("RAUSBALBU");

    // busca pelo data-testid
    const attemptLetters = screen.getAllByTestId("attempt-letter");
    expect(attemptLetters.length).toBe(9);

    // verifica que todos as leras tem a classe correta
    attemptLetters.forEach((letter) => {
      expect(letter).toHaveClass("bg-yellow-500");
    });
  });

  test("Ao acertar, errar e trocar ordem das letras", () => {
    // renderiza o componente
    renderWithAttempts("BXLABSRXR");

    // busca pelo data-testid
    const attemptLetters = screen.getAllByTestId("attempt-letter");
    expect(attemptLetters.length).toBe(9);

    // verifica que todos as leras tem a classe correta
    expect(attemptLetters[0]).toHaveClass("bg-green-500");
    expect(attemptLetters[1]).toHaveClass("bg-zinc-400");
    expect(attemptLetters[2]).toHaveClass("bg-green-500");
    expect(attemptLetters[3]).toHaveClass("bg-yellow-500");
    expect(attemptLetters[4]).toHaveClass("bg-yellow-500");
    expect(attemptLetters[5]).toHaveClass("bg-green-500");
    expect(attemptLetters[6]).toHaveClass("bg-yellow-500");
    expect(attemptLetters[7]).toHaveClass("bg-zinc-400");
    expect(attemptLetters[8]).toHaveClass("bg-green-500");
  });
});
