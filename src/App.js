import { useState } from "react";

function Square({ value, onSquareClick }) {
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}

function Board({ squares, move, winner, mark, onPlay }) {
  function handleClick(i) {
    if (squares[i] || winner) {
      return;
    }

    console.log(squares);
    const nextSquares = squares.slice();
    nextSquares[i] = mark;

    onPlay(nextSquares);
  }

  let status = "Next player: " + mark;
  if (winner) {
    status = "Winner: " + winner;
  } else if (move === 9) {
    status = "Tie game";
  }

  return (
    <>
      <div className="status>">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  )
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [move, setMove] = useState(0);
  const [winner, setWinner] = useState(null);
  const [mark, setMark] = useState('X');
  const currentSquares = history[move];

  function handlePlay(squares) {
    const nextHistory = history.slice();
    nextHistory.push(squares);
    setHistory(nextHistory);

    const nextMove = move + 1;
    const nextMark = nextMove % 2 === 0 ? 'X' : 'O';
    setMark(nextMark);
    setMove(nextMove);
    setWinner(calculateWinner(squares));
  }

  console.log(currentSquares);

  return (
    <>
      <div className="game">
        <div className="gameBoard">
          <Board squares={currentSquares} move={move} winner={winner} mark={mark} onPlay={handlePlay} />
        </div>
        <div className="gameInfo">
          <ol>{/* todo */}</ol>
        </div>
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (const line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}