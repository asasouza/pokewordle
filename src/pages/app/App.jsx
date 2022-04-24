import React from "react";
import Attempts from "./components/Attempts";
import GameStatusMessage from "./components/GameStatusMessage";
import Guesser from "./components/Guesser";
import ShadowImage from "./components/ShadowImage";

const App = () => {
  return (
    <div className="bg-red-600  h-screen max-w-md mx-auto overflow-x-hidden">
      <span className="h-16 w-full border-b-4 border-double border-black mb-5 flex items-end justify-between">
        <span className="bg-blue-500 border-4 w-10 h-10 m-5 rounded-full self-center"></span>

        <span
          className="bg-red-600 w-52 h-9 border-4 border-b-0 border-r-0 border-double border-black -mb-1 -mr-7"
          style={{ transform: "skew(-35deg)" }}
        ></span>
      </span>
      <div className="px-5 flex flex-col items-center">
        <ShadowImage />

        <Attempts />

        <Guesser />

        <GameStatusMessage />
      </div>
    </div>
  );
};

export default App;
