import React, { useState, useEffect } from "react";

interface ColorGameProps {
  onBackToGames: () => void;
}

const ColorGame: React.FC<ColorGameProps> = ({ onBackToGames }) => {
  const colorsPaletes = [
    { colorName: "Blue", hex: "#2563eb" },
    { colorName: "Red", hex: "#dc2626" },
    { colorName: "Yellow", hex: "#ca8a04" },
    { colorName: "Green", hex: "#16a34a" },
    { colorName: "Rose", hex: "#ec4899" },
    { colorName: "Violet", hex: "#7c3aed" },
    { colorName: "Cyan", hex: "#0891b2" },
    { colorName: "Teal", hex: "#0d9488" },
    { colorName: "White", hex: "#fff" },
    { colorName: "Black", hex: "#000" },
  ];

  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [correctColor, setCorrectColor] = useState(colorsPaletes[0]);
  const [displayedColor, setDisplayedColor] = useState(colorsPaletes[1]);
  const [buttonOrder, setButtonOrder] = useState<[string, string]>([
    "correct",
    "displayed",
  ]);
  const [timer, setTimer] = useState(0);
  const [endGame, setEndGame] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timer < 30 && !endGame) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timer, endGame]);

  useEffect(() => {
    if (timer === 30) {
      setEndGame(true);
    }
  }, [timer]);

  useEffect(() => {
    generateColors();
  }, []);

  const generateColors = () => {
    const randomCorrectColor =
      colorsPaletes[Math.floor(Math.random() * colorsPaletes.length)];
    let randomDisplayedColor =
      colorsPaletes[Math.floor(Math.random() * colorsPaletes.length)];

    while (randomDisplayedColor.colorName === randomCorrectColor.colorName) {
      randomDisplayedColor =
        colorsPaletes[Math.floor(Math.random() * colorsPaletes.length)];
    }

    setCorrectColor(randomCorrectColor);
    setDisplayedColor(randomDisplayedColor);

    const order: [string, string] =
      Math.random() < 0.5 ? ["correct", "displayed"] : ["displayed", "correct"];
    setButtonOrder(order);
  };

  const handleButtonClick = (colorHex: string) => {
    if (colorHex === correctColor.hex) {
      setCorrect(correct + 1);
    } else {
      setWrong(wrong + 1);
    }
    generateColors();
  };

  const handleRestart = () => {
    setCorrect(0);
    setWrong(0);
    setTimer(0);
    setEndGame(false);
    generateColors();
  };

  return (
    <div>
      {!endGame ? (
        <div className="w-3/5 mx-auto block pt-24">
          <h1 className="text-white font-bold text-2xl text-center">
            Color game
          </h1>

          <div className="w-full my-2">
            <p className="w-full text-white">Time: {timer}</p>
          </div>

          <div className="w-full border bg-slate-100 rounded px-1 pt-40 pb-5 mt-5">
            <h2
              className="text-6xl font-bold text-center"
              style={{ color: correctColor.hex }}
            >
              {displayedColor.colorName.toUpperCase()}
            </h2>

            <div className="w-full flex gap-2 justify-center mt-40 mb-2">
              {buttonOrder.map((buttonType) => (
                <button
                  key={buttonType}
                  className="px-4 py-2 rounded bg-white/50 border border-white text-sm uppercase transition ease-in hover:bg-white"
                  onClick={() =>
                    handleButtonClick(
                      buttonType === "correct"
                        ? correctColor.hex
                        : displayedColor.hex
                    )
                  }
                >
                  {buttonType === "correct"
                    ? correctColor.colorName.toUpperCase()
                    : displayedColor.colorName.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full mt-4 flex gap-3">
            <div className="w-1/2 text-base text-white font-medium flex justify-start">
              Correct: {correct}
            </div>

            <div className="w-1/2 text-base text-white font-medium flex justify-end">
              Wrong: {wrong}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-3/5 mx-auto block pt-40">
          <div className="w-full py-1 px-4 bg-white/60 rounded flex flex-col">
            <div className="flex justify-start w-4/5">
              <p className="font-bold text-gray-900 flex items-center">
                <img
                  src="./img/brain-pic.png"
                  alt="braini"
                  className="h-auto w-[90px]"
                />
                Well done!, You solved the game with this score:
              </p>
            </div>

            <div className="w-full items-center flex">
              <p className="font-bold text-gray-900 flex text-2xl items-center text-center">
                Corrects: {correct} and Wrongs: {wrong}
              </p>
            </div>

            <div className="w-full my-3">
              <button
                className="bg-violet-800 rounded px-4 py-2 text-white text-sm font-medium h-fit"
                onClick={handleRestart}
              >
                Restart
              </button>
              <button
                className="bg-violet-800 rounded px-4 py-2 text-white text-sm font-medium h-fit ml-2"
                onClick={onBackToGames}
              >
                Back to games
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorGame;
