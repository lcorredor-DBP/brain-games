import React, { useEffect, useState } from "react";

interface MemoryGameProps {
  onBackToGames: () => void;
}

interface Card {
  id: number;
  content: string;
  type: "image" | "name";
  flipped: boolean;
  solved: boolean;
}

const MemoryGame: React.FC<MemoryGameProps> = ({ onBackToGames }) => {
  const iconImages = [
    { img: "./img/Disgust.png", name: "Disgust" },
    { img: "./img/Fear.png", name: "Fear" },
    { img: "./img/Joy.png", name: "Joy" },
    { img: "./img/Sadness.png", name: "Sadness" },
    { img: "./img/Anxiety.png", name: "Anxiety" },
    { img: "./img/Envy.png", name: "Envy" },
  ];

  const createCards = () => {
    const cards: Card[] = [];
    iconImages.forEach((icon, index) => {
      cards.push(
        {
          id: index * 2,
          content: icon.img,
          type: "image",
          flipped: false,
          solved: false,
        },
        {
          id: index * 2 + 1,
          content: icon.name,
          type: "name",
          flipped: false,
          solved: false,
        }
      );
    });
    return cards;
  };

  const shuffleCards = (array: Card[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const [solvedCards, setSolvedCards] = useState<number[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const initializeGame = () => {
    const shuffledCards = shuffleCards(createCards());
    setCards(shuffledCards);
    setFlippedCards([]);
    setSolvedCards([]);
    setAttempts(0);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    const checkMatch = () => {
      const [firstCard, secondCard] = flippedCards;
      if (
        firstCard &&
        secondCard &&
        ((firstCard.type === "image" &&
          secondCard.type === "name" &&
          firstCard.content.includes(secondCard.content)) ||
          (firstCard.type === "name" &&
            secondCard.type === "image" &&
            secondCard.content.includes(firstCard.content)))
      ) {
        setSolvedCards([...solvedCards, firstCard.id, secondCard.id]);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setCards((currentCards) =>
            currentCards.map((card) =>
              flippedCards.some((flippedCard) => flippedCard.id === card.id)
                ? { ...card, flipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    };

    if (flippedCards.length === 2) {
      setAttempts((prevAttempts) => prevAttempts + 1);
      checkMatch();
    }
  }, [flippedCards, solvedCards]);

  useEffect(() => {
    if (solvedCards.length === cards.length && attempts !== 0) {
      setGameOver(true);
    } else {
      setGameOver(false);
    }
  }, [solvedCards, cards.length, attempts]);

  const handleCardClick = (id: number) => {
    const clickedCard = cards.find((card) => card.id === id);

    if (!clickedCard || clickedCard.flipped || flippedCards.length >= 2) {
      return;
    }

    const newFlippedCards = [...flippedCards, clickedCard];
    setFlippedCards(newFlippedCards);

    setCards((currentCards) =>
      currentCards.map((card) =>
        card.id === id ? { ...card, flipped: true } : card
      )
    );
  };

  const handleRestart = () => {
    initializeGame();
  };

  return (
    <div className="w-3/5 mx-auto block py-36">
      {!gameOver ? (
        <div className="w-full">
          <h1 className="text-white font-bold text-2xl text-center">
            Card Memory Game
          </h1>
          <h3 className="text-white font-bold text-xl text-left mt-5">
            Attempts: {attempts}
          </h3>
          <div className="w-full grid gap-5 grid-cols-4 my-8">
            {cards.map((card) => (
              <div
                key={card.id}
                className={`bg-white/50 border border-white hover:bg-white transition ease-in cursor-pointer p-4 rounded ${
                  card.flipped || card.solved ? "flipped" : ""
                }`}
                onClick={() =>
                  !card.flipped && !card.solved && handleCardClick(card.id)
                }
              >
                <div className="font-semibold flex items-center text-base min-h-[60px]">
                  {card.flipped || card.solved ? (
                    card.type === "image" ? (
                      <img
                        src={card.content}
                        alt="icon"
                        className="h-[60px] object-fill w-auto block m-auto"
                      />
                    ) : (
                      <p className="text-gray-600 text-center w-full">
                        {card.content}
                      </p>
                    )
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full py-5 px-4 bg-white/60 rounded flex flex-col">
          <div className="flex justify-start w-full">
            <p className="font-bold text-gray-900 flex items-center">
              <img
                src="./img/brain-pic.png"
                alt="braini"
                className="h-auto w-[90px]"
              />
              Well done!, You solved the game in {attempts} attempts. 🎉
            </p>
          </div>

          <div className="flex justify-start w-full">
            <button
              className="bg-violet-800 rounded px-4 py-2 text-white text-sm font-medium h-fit"
              onClick={handleRestart}
            >
              Restart
            </button>
            <button
              className="bg-violet-800 rounded px-4 py-2 text-white text-sm font-medium h-fit ml-2"
              onClick={() => {
                onBackToGames();
                setGameOver(false);
              }}
            >
              Back to games
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
