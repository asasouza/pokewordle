import { rest } from "msw";

export const handlers = [
  rest.get("https://pokeapi.co/api/v2/pokemon/*", (req, res, ctx) => {
    return res(
      ctx.json({
        name: "bulbasaur",
        id: 1,
        sprites: {
          front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
        },
      })
    );
  }),
];
