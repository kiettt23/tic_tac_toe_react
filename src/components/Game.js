import React, { useState, useEffect } from "react";
import Board from "./Board";
import History from "./History";

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);

  // Declaring a Winner
  // Problem: Nếu full bàn cờ mà vẫn không có người thắng thì nên hiển thị hòa
  useEffect(() => {
    const whoWinner = calculateWinner(squares);
    if (whoWinner != null) {
      setWinner(whoWinner);
    }
    if (whoWinner === null && !squares.includes(null)) {
      setWinner("None - Draw");
    }
  }, [squares]);

  // function to check if a player has won.
  // If a player has won, we can display text such as “Winner: X” or “Winner: O”.
  // Input: squares: given an array of 9 squares:'X', 'O', or null.
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  // Handle player
  // Problem: Sau khi có người thắng, ô đã được đánh hoặc khi ô đầy vẫn có thể click tiếp ghi đè bởi người khác
  // - Kiểm tra có người thắng chưa: if winner != null, return chặn click
  // - Kiểm tra ô đã có giá trị chưa: if newSquares[i] != null, return chặn click
  const handleClick = (i) => {
    if (winner != null || squares[i] != null) {
      return;
    } else {
      const newSquares = [...squares];
      const result = xIsNext ? "X" : "O";
      newSquares[i] = result;
      setSquares(newSquares);
      setXIsNext(!xIsNext);

      //History
      const newHistory = history.slice(0, stepNumber + 1);
      setHistory([...newHistory, newSquares]);
      setStepNumber(newHistory.length); // Nhảy tới bước mới
    }
  };

  function moveTo(step) {
    setStepNumber(step);
    setSquares(history[step]); // Đồng bộ lại squares khi nhảy
    setXIsNext(step % 2 === 0); // Nếu step là số chẵn = X , lẻ = O
  }

  // Restart game
  // - Khi bấm nút reset sẽ quay lại các state ban đầu: set lại tất cả State
  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setHistory([Array(9).fill(null)]);
    setStepNumber(0);
  };

  return (
    <div className="main">
      <h2 className="result">Winner is: {winner ? winner : "N/N"}</h2>
      <div className="player">Next player is: {xIsNext ? "X" : "O"}</div>
      <div className="game">
        <Board squares={squares} handleClick={handleClick} />
        <History history={history} moveTo={moveTo} />
      </div>
      <button onClick={handleRestart} className="restart-btn">
        Restart
      </button>
    </div>
  );
}

export default Game;
