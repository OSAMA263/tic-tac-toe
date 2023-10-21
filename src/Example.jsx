import { useRef, useState } from "react";
import styled from "styled-components";

export default function Example() {
  // 1- build a board tic tac toe
  const cols_rows = 3;
  const [board, setBoard] = useState(
    Array.from({ length: cols_rows * cols_rows }, () => null)
  );
  const [turn, setTurn] = useState("x");
  const [winner, setWinner] = useState("");
  const ref = useRef([]);
  const cloneBoard = [...board];

  const [winningSquers, setWinnnigSquers] = useState([]);

  const handleClick = (e, i) => {
    if (e.target.innerHTML != "" || winner != "") {
      return;
    }
    e.target.innerHTML = turn;
    cloneBoard[i] = turn;
    setBoard([...cloneBoard]);
    theWinner();
    setTurn(turn === "x" ? "o" : "x");
  };
  // 2- if there is a winner print him
  const theWinner = () => {
    liens.map((line) => {
      const [a, b, c] = line;
      if (
        cloneBoard[a] != null &&
        cloneBoard[a] != "" &&
        cloneBoard[a] === cloneBoard[b] &&
        cloneBoard[b] === cloneBoard[c]
      ) {
        setWinnnigSquers([a, b, c]);
        setWinner(turn);
      } else if (cloneBoard.every((sque) => sque != null)) {
        setWinner("draw?");
      }
    });
  };

  // 3- reset after winner
  const resetGame = () => {
    setBoard(Array.from({ length: 3 * 3 }, () => null));
    ref.current.map((e) => (e.innerHTML = ""));
    setWinnnigSquers([]);
    setWinner("");
  };

  return (
    <>
      <Wrapper>
        <h2>turn:{turn}</h2>
        <Container>
          <Board cols_rows={cols_rows}>
            {cloneBoard.map((_, i) => (
              <Square
                {...{ winningSquers, i }}
                ref={(e) => (ref.current[i] = e)}
                onClick={(e) => handleClick(e, i)}
                key={i}
              ></Square>
            ))}
          </Board>
        </Container>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ResetBtn onClick={resetGame}>reset game</ResetBtn>
          <h2>
            {winner != "" && winner != "draw?" && "the winner is :"}
            {winner}
          </h2>
        </div>
      </Wrapper>
    </>
  );
}

const liens = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// --------------
const ResetBtn = styled.button`
  margin-top: 1rem;
  font-weight: bold;
  width: fit-content;
  margin-inline: "auto";
`;

const Square = styled.button`
  ${({ i, winningSquers }) =>
    winningSquers.includes(i)
      ? "background-color:red;"
      : "background-color: gray;"}
  border: 4px solid #6f26ce;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  transition: all 0.4s;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  &:hover {
    background-color: white;
  }
`;

const Board = styled.div`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(${({ cols_rows }) => cols_rows}, 1fr);
  grid-template-rows: repeat(${({ cols_rows }) => cols_rows}, 1fr);
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  height: 100dvh;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;
