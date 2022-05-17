import { render } from "@testing-library/react";
import { useEffect } from "react";
import { PokeWordleProvider, usePokeWordle } from "../PokeWordle";

describe("PokeWordle Context", () => {
  let consoleErrorMock;

  beforeAll(() => {
    consoleErrorMock = jest
      .spyOn(console, "error")
      .mockImplementation(() => jest.fn());
  });

  afterAll(() => {
    consoleErrorMock.mockRestore();
  });

  /* TECH TALK - EXEMPLO DE ASSERT DE EXCEÇÃO NA RENDERIZAÇÃO DE COMPONENTES */
  test("Deve causar erro ao tentar utilizar o hook sem o Provider", () => {
    const ExceptionComponent = () => {
      usePokeWordle();
      return null;
    };

    expect(() => render(<ExceptionComponent />)).toThrow(
      "usePokeWordle must be used within an PokeWordleProvider"
    );
  });

  test("Deve causar erro ao tentar adicionar mais tentativas que o permitido", () => {
    const ExceptionComponent = () => {
      const [{ addAttempt }] = usePokeWordle();

      useEffect(() => {
        addAttempt("bulbasaur");
      });
      return null;
    };
    expect(() =>
      render(
        <PokeWordleProvider>
          <ExceptionComponent />
        </PokeWordleProvider>
      )
    ).toThrow("max attempts reached");
  });
});
