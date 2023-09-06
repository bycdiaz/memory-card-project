import { useState } from "react"
import GameInfo from "./components/GameInfo"
import Header from "./components/Header"
import MemoryCards from "./components/MemoryCards";
import { Pokemon } from "./data";
import './styles/game-container.css'

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [currentRoundSelections, setCurrentRoundSelections] = useState([] as Pokemon[]);
  const [gameOver, setGameOver] = useState(false);

  return (
    <div className="game-container">
      <Header title="Memory Card Game" />
      <GameInfo
        currentScore={currentScore}
        bestScore={bestScore}
      />
      {gameView()}
    </div>
  )

  function gameView() {
    if (gameOver) {
      return (
        <>
          <div>{'Game over!'}</div>
          <button onClick={() => setGameOver(false)}>{'Play Again'}</button>
        </>
      )
    } else {
      return (
        <MemoryCards
          handleCardClick={handleCardClick}
        />
      )
    }
  }

  function handleCardClick(pokemonName: Pokemon) {
    if (currentRoundSelections.includes(pokemonName)) {
      endGame();
    } else {
      continueGame(pokemonName);
    }
  }

  function continueGame(pokemonName: Pokemon) {
    setCurrentScore(currentScore + 1);
    setCurrentRoundSelections([...currentRoundSelections, pokemonName]);
  }

  function endGame() {
    if (currentScore > bestScore) {
      setBestScore(currentScore);
    }

    setGameOver(true);
    setCurrentScore(0);
    setCurrentRoundSelections([]);
  }
}

export default App
