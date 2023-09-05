type GameInfoProps = {
  currentScore: number;
  bestScore: number;
}

function GameInfo({ currentScore, bestScore }: GameInfoProps) {
  return (
    <div>
      <div>
        Current Score: {currentScore}
      </div>
      <div>
        Best Score: {bestScore}
      </div>
    </div>
  )
}

export default GameInfo
