/* TECH TALK -- EXEMPLO DE TESTE */
import { logRoles, prettyDOM, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const DummyComponent = () => {
  return (
    <div>
      <h2>This is a dummy component</h2>
      <button data-testid="button">Click Me</button>
    </div>
  );
};

describe("Dummy component test", () => {
  test("Elements must be in the screen", () => {
    // renderiza o componente na virtual DOM de teste
    render(<DummyComponent />);

    // screen é uma global que contem os métodos para encontrar
    // elementos na virtual DOM
    const h2 = screen.getByRole("heading");

    // asserts baseados no element DOM
    expect(h2).toBeInTheDocument();
    expect(h2).toHaveTextContent("This is a dummy component");

    // a busca por componentes pode ser feita de diversas formas
    // e esta é uma das menos sugeridas
    const button = screen.getByTestId("button");

    // realiza um evento no elemento recebido, simulando interações
    // do utente
    userEvent.click(button);

    // debugging
    logRoles(h2);

    console.log(prettyDOM());
    
    console.log(prettyDOM(h2));
  });
});