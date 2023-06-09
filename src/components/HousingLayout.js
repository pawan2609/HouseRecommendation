// src/components/HousingLayout.js
import React, { useState } from 'react';
import Plot from './Plot';
import '../styles/HousingLayout.css';

const HousingLayout = () => {
  const [grid, setGrid] = useState([]);
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);

  const createGrid = () => {
    const newGrid = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push({ service: null });
      }
      newGrid.push(row);
    }
    setGrid(newGrid);
  };

  const assignService = (rowIndex, colIndex, service) => {
    const updatedGrid = [...grid];
    updatedGrid[rowIndex][colIndex].service = service;
    setGrid(updatedGrid);
  };

  const addHouse = (rowIndex, colIndex, label) => {
    const updatedGrid = [...grid];
    updatedGrid[rowIndex][colIndex].service = 'House';
    updatedGrid[rowIndex][colIndex].label = label;
    setGrid(updatedGrid);
  };

  const recommendHouse = () => {
    let bestHouse = null;
    let maxScore = -1;

    grid.forEach((row, rowIndex) => {
      row.forEach((plot, colIndex) => {
        if (plot.service === 'House') {
          let score = 0;

          // Check the adjacent plots for services
          if (rowIndex > 0 && grid[rowIndex - 1][colIndex].service) {
            score++;
          }
          if (rowIndex < rows - 1 && grid[rowIndex + 1][colIndex].service) {
            score++;
          }
          if (colIndex > 0 && grid[rowIndex][colIndex - 1].service) {
            score++;
          }
          if (colIndex < cols - 1 && grid[rowIndex][colIndex + 1].service) {
            score++;
          }

          if (score > maxScore) {
            maxScore = score;
            bestHouse = plot;
          }
        }
      });
    });

    if (bestHouse) {
      console.log('Recommended House:', bestHouse.label);
    } else {
      console.log('No houses found!');
    }
  };

  return (
    <div className="housing-layout">
      <div>
        <label>Rows: </label>
        <input
          type="number"
          value={rows}
          onChange={(e) => setRows(parseInt(e.target.value))}
        />
      </div>
      <div>
        <label>Columns: </label>
        <input
          type="number"
          value={cols}
          onChange={(e) => setCols(parseInt(e.target.value))}
        />
      </div>
      <button onClick={createGrid}>Create Grid</button>

      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((plot, colIndex) => (
              <Plot
                key={colIndex}
                service={plot.service}
                assignService={(service) => assignService(rowIndex, colIndex, service)}
                addHouse={(label) => addHouse(rowIndex, colIndex, label)}
              />
            ))}
          </div>
        ))}
      </div>

      <button onClick={recommendHouse}>Recommend House</button>
    </div>
  );
};

export default HousingLayout;
