import React, { useEffect, useState } from "react";
import ColorGame from "./colorGame";
import MemoryGame from "./MemoryGame";

function App(): React.ReactElement | null {
  const [userName, setUserName] = useState("");
  const [storedUserName, setStoredUserName] = useState("");
  const [showMeetMessage, setShowMeetMessage] = useState(false);
  const [showSetNameDiv, setShowSetNameDiv] = useState(true);
  const [showCardsGame, setShowCardsGame] = useState(false);
  const [showColorsGame, setShowColorsGame] = useState(false);

  useEffect(() => {
    const storedUserName = localStorage.getItem("nombre_usuario_game");
    if (storedUserName) {
      setStoredUserName(storedUserName);
      setShowMeetMessage(false);
    }
  }, []);

  const handleGoToCardMemory = () => {
    setShowCardsGame(!showCardsGame);
  };

  const handleGoToColorGame = () => {
    setShowColorsGame(!showColorsGame);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleForgotName = () => {
    setUserName("");
    localStorage.removeItem("nombre_usuario_game");
    setStoredUserName("");
  };

  const handleGotToGames = () => {
    setShowMeetMessage(true);
    setShowSetNameDiv(false);
  };

  const handleRegister = () => {
    localStorage.setItem("nombre_usuario_game", userName);
    setShowMeetMessage(true);
    setShowSetNameDiv(false);
  };

  const handleBackToUserConfig = () => {
    setShowSetNameDiv(!showSetNameDiv);
  };

  return (
    <div className="App">
      <div className="bg-gradient-to-t from-violet-300 to-indigo-600 h-screen w-full">
        {!showCardsGame && !showColorsGame && (
          <div className="w-3/5 mx-auto block py-40">
            <div className="w-full flex gap-2 items-center">
              <div className="w-2/5">
                {showMeetMessage && (
                  <div className="absolute w-[300px] mt-32 left-28">
                    <div className="flex items-center justify-end">
                      <div className="bg-white/60 text-xs backdrop-blur p-4 my-6 rounded-lg flex-1">
                        Hello <strong>{userName}</strong>, nice to meet you, my
                        name is <strong>Braini</strong>, now I won't forget your
                        name
                      </div>
                      <div className="w-3 overflow-hidden ">
                        <div className="h-4 bg-white/60 backdrop-blur rotate-45 transform origin-top-left rounded-sm"></div>
                      </div>
                    </div>
                  </div>
                )}

                {storedUserName !== "" && (
                  <div className="absolute w-[300px] mt-32 left-28">
                    <div className="flex items-center justify-end">
                      <div className="bg-white/60 text-xs backdrop-blur p-4 my-6 rounded-lg flex-1">
                        Hello again <strong>{storedUserName}</strong>, I told
                        you I wouldn't forget you...
                      </div>
                      <div className="w-3 overflow-hidden ">
                        <div className="h-4 bg-white/60 backdrop-blur rotate-45 transform origin-top-left rounded-sm"></div>
                      </div>
                    </div>
                  </div>
                )}
                <img
                  src="./img/brain-pic.png"
                  alt="braini"
                  className="h-auto w-full"
                />
              </div>
              <div className="w-3/5">
                <h1 className="text-bolder text-4xl text-left text-white text-nowrap">
                  Welcome to mind games! ✨
                </h1>

                <div className="w-[20%] bg-white p-2 rounded-full my-4"></div>

                {showSetNameDiv ? (
                  <div className="w-full">
                    <p className="text-white text-xl mb-4 font-medium">
                      Please enter your user name
                    </p>
                    <input
                      type="text"
                      id="first_name"
                      className="bg-gray-50 font-bold text-violet-800 border border-gray-300 text-sm rounded-lg focus:ring-violet-500 focus:border-blue-500 block w-full p-3"
                      placeholder="John Doe"
                      value={userName || storedUserName}
                      disabled={storedUserName !== ""}
                      onChange={handleInputChange}
                      required
                    />

                    <div className="w-full gap-2 flex">
                      <button
                        onClick={handleRegister}
                        disabled={userName === ""}
                        className={`my-4 px-4 py-2 rounded text-white font-semibold transition ease-in ${
                          userName === ""
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-violet-950"
                        }`}
                      >
                        Register
                      </button>

                      {storedUserName !== "" && (
                        <button
                          onClick={handleGotToGames}
                          className="my-4 px-4 py-2 bg-violet-900 rounded text-white font-semibold"
                        >
                          Go to games
                        </button>
                      )}

                      {storedUserName !== "" && (
                        <button
                          onClick={handleForgotName}
                          className="my-4 px-4 py-2 bg-indigo-950 rounded text-white font-semibold"
                        >
                          Forgot name
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="w-full">
                    <p className="text-white text-xl mb-8 font-medium">
                      Ready player one! 🎮 , now choose a game {userName}
                    </p>

                    <div className="W-full flex gap-3">
                      <div
                        onClick={handleGoToCardMemory}
                        className="p-4 rounded w-1/2 flex h-fit gap-2 bg-white/50 backdrop-blur-sm border border-white hover:bg-white cursor-pointer transition ease-in"
                      >
                        <h3 className="ml-16 text-base font-bold text-gray-800 text-center">
                          Card memory game
                        </h3>
                        <img
                          src="./img/cartas.png"
                          alt="card memory img"
                          className="w-[70px] -mt-8 -ml-2 h-auto absolute"
                        />
                      </div>
                      <div
                        onClick={handleGoToColorGame}
                        className="p-4 rounded w-1/2 flex h-fit gap-2 bg-white/50 backdrop-blur-sm border border-white hover:bg-white cursor-pointer transition ease-in"
                      >
                        <h3 className="ml-16 text-base font-bold text-gray-800 text-center">
                          Get the color game
                        </h3>

                        <img
                          src="./img/colores.png"
                          alt="colors memory img"
                          className="w-[70px] -mt-8 -ml-2 h-auto absolute"
                        />
                      </div>
                    </div>

                    <div className="w-full mt-4">
                      <button
                        onClick={handleBackToUserConfig}
                        className="my-4 px-4 py-2 bg-indigo-950 rounded text-white font-semibold"
                      >
                        Back to user profile
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {showCardsGame && <MemoryGame onBackToGames={handleGoToCardMemory} />}

        {showColorsGame && <ColorGame onBackToGames={handleGoToColorGame} />}

        <div className="w-full absolute bottom-0 p-3 bg-white/50 backdrop-blur">
          <p className="text-gray-700 font-bold text-xs">
            Develop with ❤️ by Luis Corredor
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
