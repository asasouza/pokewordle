import { render } from "@testing-library/react";
import { PokeWordleProvider } from "../../contexts/PokeWordle";

const renderWithContext = (ui, options) => {
  render(ui, { wrapper: PokeWordleProvider, ...options });
};

export * from "@testing-library/react";

export { renderWithContext as render };
