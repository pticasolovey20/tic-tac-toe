import React, { useState } from 'react';
import './App.css';
import Board from './componets/Board/Board';

function App() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setNext] = useState(true);

    const handleClick = index => {
        const newSquares = [...squares];
        if (calculateWinner(squares) || squares[index]) {
            return;
        }
        newSquares[index] = xIsNext ? 'X' : 'O';
        setSquares(newSquares);
        setNext(!xIsNext);
    };

    const calculateWinner = squares => {
        const winnerLines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < winnerLines.length; i++) {
            const [a, b, c] = winnerLines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = 'WINNER IS: ' + winner;
    } else {
        status = 'NEXT STEP: ' + (xIsNext ? 'X' : 'O');
    }

    return (
        <div className="game">
            <div className="game-board">
                <div className="status">{status}</div>
                <Board
                    squares={squares}
                    setSquares={setSquares}
                    xIsNext={xIsNext}
                    setNext={setNext}
                    status={status}
                    calculateWinner={calculateWinner}
                    handleClick={handleClick}
                />
            </div>
        </div>
    );
}

export default App;
