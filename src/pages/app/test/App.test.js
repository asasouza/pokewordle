import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("App", () => {
  test("Estado inicial da aplicação", async () => {
    render(<App />);

    // renderiza a imagem do pokemon na tela
    const image = await screen.findByRole("img", {
      name: /misterious pokemon image/i,
    });
    expect(image).toBeInTheDocument();

    // renderiza os inputs para inserção
    const inputs = await screen.findAllByRole("textbox");
    expect(inputs).toHaveLength(9);
    inputs.forEach((input) => {
      expect(input).toBeEnabled();
      expect(input).toHaveValue("");
    });

    // botão de nova tentativa deve estar desabilitado
    const button = screen.getByRole("button", { name: /play again/i });
    expect(button).toBeDisabled();
  });

  test("Ao acertar o pokemon dentro do máximo de tentativas", async () => {
    render(<App />);

    // insere os valores corretos nos inputs
    const inputs = await screen.findAllByRole("textbox");
    expect(inputs).toHaveLength(9);
    ["b", "u", "l", "b", "a", "s", "a", "u", "r"].forEach((letter, i) => {
      const input = inputs[i];
      userEvent.clear(input);
      userEvent.type(input, letter);
    });

    // deve exibir mensagem de sucesso
    const message = await screen.findByText(
      "Congrats, you're a true Pokemon master. Play again!"
    );
    expect(message).toBeInTheDocument();

    // deve habilitar o botão para jogar novamente
    const button = screen.getByRole("button", { name: /play again/i });
    expect(button).toBeEnabled();
  });

  test("Ao não acertar o pokemon dentro do máximo de tentativas", async () => {
    render(<App />);
    // @ToDo: deve limitar as tentativas para 1 neste teste

    // insere os valores incorretos nos inputs
    const inputs = await screen.findAllByRole("textbox");
    expect(inputs).toHaveLength(9);
    ["a", "b", "c", "d", "e", "f", "g", "h", "i"].forEach((letter, i) => {
      const input = inputs[i];
      userEvent.clear(input);
      userEvent.type(input, letter);
    });

    // deve exibir mensagem de erro
    const message = await screen.findByText(
      "Sorry, but you do not guess the Pokemon"
    );
    expect(message).toBeInTheDocument();

    // deve exibir o nome do pokemon não descoberto
    const pokemonName = screen.getByText("The Pokemon was: Bulbasaur");
    expect(pokemonName).toBeInTheDocument();

    // deve habilitar o botão para jogar novamente
    const button = screen.getByRole("button", { name: /play again/i });
    expect(button).toBeEnabled();
  });

  describe("Componente de letras", () => {
    test("Estado inicial do componente", () => {});

    test.todo("Ao acertar todas as letras");

    test.todo("Ao errar todas as letras");

    test.todo("Ao inserir todas as letras na ordem errada");

    test.todo("Ao acertar, errar e trocar ordem das letras");
  });

  describe("Componente de imagem", () => {
    test.todo("Estado inicial do componente");

    test.todo("Ao final das tentativas");
  });
});
