import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [gridCol, setGridCol] = useState(4);
  const [gridRow, setGridRow] = useState(4);
  const totalSquares = gridCol * gridRow;
  const [colors, setColors] = useState(Array(totalSquares).fill(""));

  const getRandomColor = () => {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#FFD700", "#FF33A8"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const colorDiagonals = (index) => {
    const clickedRow = Math.floor(index / gridCol);
    const clickedCol = index % gridCol;
    const selectedColor = getRandomColor();
    const newColors = [...Array(totalSquares).fill("")];

    for (let row = 0; row < gridRow; row++) {
      for (let col = 0; col < gridCol; col++) {
        if (
          row + col === clickedRow + clickedCol ||
          row - col === clickedRow - clickedCol
        ) {
          newColors[row * gridCol + col] = selectedColor;
        }
      }
    }
    newColors[index] = selectedColor;
    setColors(newColors);
  };

  const handleSquareClick = (index) => {
    colorDiagonals(index);
  };

  useEffect(() => {
    setColors(Array(totalSquares).fill(""));
  }, [gridRow, gridCol]);
  return (
    <>
      <div className="main">
        <div>
          <div className="inputDiv"> <h3>Grid Size: </h3>
            <span>
              <input
                type="number"
                className="input"
                value={gridCol}
                min={1}
                max={15}
                onChange={(e) => setGridCol(Number(e.target.value))}
              />
            </span>

            <span>&#x2715;</span>
            <span>
              <input
                type="number"
                className="input"
                value={gridRow}
                min={1}
                max={15}
                onChange={(e) => setGridRow(Number(e.target.value))}
              />
            </span>
          </div>
          <div
            className="container"
            style={{
              gridTemplateColumns: `repeat(${gridCol}, 1fr)`,
              gridTemplateRows: `repeat(${gridRow}, 1fr)`,
            }}
          >
            {colors.map((color, i) => (
              <div
                key={i}
                style={{ backgroundColor: color || "#f0f0f0" }}
                onClick={() => handleSquareClick(i)}
                className="square"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
