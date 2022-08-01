import {
  render,
  screen,
  fireEvent,
} from "../../../tests/utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { MAX_ATTEMPTS } from "../../../contexts/PokeWordle";

describe("App", () => {
  test.only("Estado inicial da aplicação", async () => {
    render(<App />);

    // renderiza a imagem do pokemon na tela
    const image = screen.getByRole("img", {
      name: /misterious pokemon artwork/i,
    });
    expect(image).toBeInTheDocument();

    // renderiza os inputs para inserção
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(9);
    inputs.forEach((input) => {
      expect(input).toBeEnabled();
      expect(input).toHaveValue("");
    });

    // botão de nova tentativa deve estar desabilitado
    const button = screen.queryByRole("button", { name: /play again/i });
    expect(button).not.toBeInTheDocument();
  });

  test("Ao acertar o pokemon dentro do máximo de tentativas", async () => {
    render(<App />);

    // insere os valores corretos nos inputs
    const inputs = await screen.findAllByRole("textbox");
    expect(inputs).toHaveLength(9);
    ["b", "u", "l", "b", "a", "s", "a", "u", "r"].forEach((letter, i) => {
      const input = inputs[i];
      userEvent.clear(input);
      /* TECH TALK -- EXEMPLO FIREEVENT X USEREVENT */

      // COM FIREEVENT PODEMOS MUDAR O VALOR DE UM INPUT DA FORMA SEGUINTE
      // O PROBLEMA COM ISSO É QUE NÃO É FEITA UMA INTERAÇÃO COMO UM UTENTE
      // FARIA NA APLICAÇÃO, E ISTO PODE GERAR FALSOS POSITIVOS NOS TESTES.

      // fireEvent.change(input, { target: { value: letter } });

      // UTILIZANDO O USEREVENT A BIBLIOTECA BUSCA SIMULAR A FORMA DE INTERAÇÃO
      // COMO O OCORRERIA COM O UTENTE (CAMPO DISABLED, FOCUSED, ACTIVE, ETC)
      userEvent.type(input, letter);
    });

    /* TECH TALK -- EXEMPLO INTERAÇÃO NA TELA COMO SERIA FEITO PELO UTENTE */
    
    // ESTAR SEMPRE ATENTO A FORMA COMO O UTENTE IRÁ INTERAGIR COM A TELA
    // NESTE EXEMPLO TEMOS UM CAMPO DE INPUT SUBMIT QUE É OCULTO NA TELA
    // UTILIZANDO A FUNÇÃO SCREEN É POSSÍVEL BUSCAR ESSE ELEMENTO E CLICAR NELE, PORÉM
    // NÃO É DESTA FORMA QUE SERÁ FEITA A INTERAÇÃO PELO UTENTE
    const submit = screen.getByRole("button", { name: /submit/i });
    userEvent.click(submit);

    // A ABORDAGEM RECOMENDADA NESTE CASO É INTERAGIR COMO SERIA FEITO PELO 
    // UTENTE, SUBMETENDO O FORM COM A TECLA [ENTER]
    userEvent.keyboard("[Enter]");

    // deve exibir mensagem de sucesso
    const message = screen.getByText("Congrats, you're a true Pokemon master.");
    expect(message).toBeInTheDocument();

    // deve habilitar o botão para jogar novamente
    const button = screen.getByRole("button", { name: /play again/i });
    expect(button).toBeEnabled();

    // deve iniciar um novo jogo ao clicar no botão
    userEvent.click(button);

    const emptyInputs = await screen.findAllByRole("textbox");
    emptyInputs.forEach((input) => {
      expect(input).toHaveValue("");
    });
    expect(message).toHaveTextContent("");
    expect(button).not.toBeInTheDocument();
  });

  test("Ao não acertar o pokemon dentro do máximo de tentativas", async () => {
    render(<App />);

    // insere os valores incorretos nos inputs
    const inputs = await screen.findAllByRole("textbox");
    expect(inputs).toHaveLength(9);

    const submit = screen.getByRole("button", { name: /submit/i });

    for (let index = 0; index < MAX_ATTEMPTS; index++) {
      ["a", "b", "c", "d", "e", "f", "g", "h", "i"].forEach((letter, i) => {
        const input = inputs[i];
        userEvent.clear(input);
        userEvent.type(input, letter);
      });
      userEvent.click(submit);
    }

    // deve exibir mensagem de erro
    const message = screen.getByText(
      "Sorry, but you do not guess the Pokemon."
    );
    expect(message).toBeInTheDocument();

    // deve exibir o nome do pokemon não descoberto
    const pokemonName = screen.getByText("Bulbasaur");
    expect(pokemonName).toBeInTheDocument();

    // deve habilitar o botão para jogar novamente
    const button = screen.getByRole("button", { name: /play again/i });
    expect(button).toBeEnabled();
  });
});
