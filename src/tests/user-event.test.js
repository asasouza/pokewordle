import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

const MyComponentForm = () => {
  const [inputData, setInputData] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    setInputData("");
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={(e) => setInputData(e.target.value)}
          value={inputData}
          name="my-text"
          disabled
        />
        <input type="submit" value="Submit" className="hidden" />
      </form>
      <p>{inputData}</p>
    </div>
  );
};

test("Testing with fireEvent", () => {
  // renderiza o componente na virtual DOM de teste
  render(<MyComponentForm />);

  // Encontra o elemento de input
  const input = screen.getByRole("textbox");

  // Utiliza o fireEvent para disparar um evento no elemento
  fireEvent.change(input, { target: { value: "this is a test" } });

  // Busca um elemento com o texto inserido no input
  const pText = screen.getByText("this is a test");
  expect(pText).toBeInTheDocument();
});

test("Testing with userEvent", () => {
  // renderiza o componente na virtual DOM de teste
  render(<MyComponentForm />);

  // Encontra o elemento de input
  const input = screen.getByRole("textbox");

  // Utiliza o userEvent para simular a digitação no elemento
  userEvent.type(input, "this is a test");

  // Busca um elemento com o texto inserido no input
  const pText = screen.getByText("this is a test");
  expect(pText).toBeInTheDocument();
});

test("Testing like a robot", () => {
  // renderiza o componente na virtual DOM de teste
  render(<MyComponentForm />);

  // Encontra o elemento de input
  const input = screen.getByRole("textbox");

  // Utiliza o fireEvent para disparar um evento no elemento
  fireEvent.change(input, { target: { value: "this is a test" } });

  // Busca um elemento com o texto inserido no input
  const pText = screen.getByText("this is a test");
  expect(pText).toBeInTheDocument();

  // Busca o elemento de submit (mesmo não sendo visível)
  const submitInput = screen.getByRole("button", { name: /submit/i });
  // Clica no elemento
  fireEvent.click(submitInput);

  // Espera que o input e o texto estejam vazios
  expect(input).toHaveValue("");
  expect(pText).toHaveTextContent("");
});

test("Testing like a user", () => {
  // renderiza o componente na virtual DOM de teste
  render(<MyComponentForm />);

  // Encontra o elemento de input
  const input = screen.getByRole("textbox");

  // Utiliza o userEvent para simular a digitação no elemento
  userEvent.type(input, "this is a test");

  // Busca um elemento com o texto inserido no input
  const pText = screen.getByText("this is a test");
  expect(pText).toBeInTheDocument();

  // Interage com a aplicação teclando o [Enter]
  userEvent.keyboard("[Enter]");

  // Espera que o input e o texto estejam vazios
  expect(input).toHaveValue("");
  expect(pText).toHaveTextContent("");
});


