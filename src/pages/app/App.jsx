import React from "react";

const App = () => {
  return (
    <div className="bg-gray-100 h-screen max-w-md mx-auto overflow-x-hidden p-4 relative">
      <div className="w-1/3 block m-auto relative">
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
          alt="Misterious pokemon artwork"
          className="filter brightness-0"
        />
      </div>

      <div className="flex justify-center">
        {[0, 1, 2].map((i) => (
          <input key={i} className="border w-10 h-10 mr-2 rounded" />
        ))}
      </div>

      <button disabled>Play Again</button>
    </div>
  );
};

export default App;
