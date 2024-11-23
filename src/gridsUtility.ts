import { toaster } from "./components/ui/toaster";

export const GRID_SIZE = 10;
export const MAX_FILLED_PER_LINE = 3;

export const createEmptyGrid = () =>
  Array(GRID_SIZE)
    .fill(0)
    .map(() => Array(GRID_SIZE).fill(0));

export const getRowCounts = (grid: number[][]) =>
  grid.map((row) => row.reduce((sum, cell) => sum + cell, 0));

export const getColumnCounts = (grid: number[][]) => {
  //empty array
  const counts = Array(GRID_SIZE).fill(0);
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      counts[j] += grid[i][j];
    }
  }
  return counts;
};

export const hasSquarePattern = (
  newGrid: number[][],
  row: number,
  col: number
) => {
  const patterns = [
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ], // Check current position as top-left
    [
      [-1, 0],
      [-1, 1],
      [0, 0],
      [0, 1],
    ], // Check current position as bottom-left
    [
      [0, -1],
      [0, 0],
      [1, -1],
      [1, 0],
    ], // Check current position as top-right
    [
      [-1, -1],
      [-1, 0],
      [0, -1],
      [0, 0],
    ], // Check current position as bottom-right
  ];

  return patterns.some((pattern) => {
    return pattern.every(([dx, dy]) => {
      const newRow = row + dx;
      const newCol = col + dy;
      return (
        newRow >= 0 &&
        newRow < GRID_SIZE &&
        newCol >= 0 &&
        newCol < GRID_SIZE &&
        newGrid[newRow][newCol] === 1
      );
    });
  });
};

export const updateNeighbors = (
  newGrid: number[][],
  row: number,
  col: number
) => {
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  directions.forEach(([dx, dy]) => {
    const newRow = row + dx;
    const newCol = col + dy;

    if (
      newRow >= 0 &&
      newRow < GRID_SIZE &&
      newCol >= 0 &&
      newCol < GRID_SIZE
    ) {
      // Create a temporary grid to test the change
      const testGrid = newGrid.map((row) => [...row]);
      testGrid[newRow][newCol] = 1;

      // Check constraints before applying
      const rowCount = testGrid[newRow].reduce((sum, cell) => sum + cell, 0);
      const colCount = testGrid.reduce((sum, row) => sum + row[newCol], 0);

      if (
        rowCount <= MAX_FILLED_PER_LINE &&
        colCount <= MAX_FILLED_PER_LINE &&
        !hasSquarePattern(testGrid, newRow, newCol)
      ) {
        newGrid[newRow][newCol] = 1;
      }
    }
  });

  return newGrid;
};

export const generateRandomGrid = () => {
  const newGrid = createEmptyGrid();
  const attempts = 20; // Number of attempts to fill cells randomly

  for (let i = 0; i < attempts; i++) {
    const row = Math.floor(Math.random() * GRID_SIZE);
    const col = Math.floor(Math.random() * GRID_SIZE);

    if (newGrid[row][col] === 0) {
      const testGrid = newGrid.map((row) => [...row]);
      testGrid[row][col] = 1;

      const rowCount = testGrid[row].reduce((sum, cell) => sum + cell, 0);
      const colCount = testGrid.reduce((sum, row) => sum + row[col], 0);

      if (
        rowCount <= MAX_FILLED_PER_LINE &&
        colCount <= MAX_FILLED_PER_LINE &&
        !hasSquarePattern(testGrid, row, col)
      ) {
        newGrid[row][col] = 1;
        updateNeighbors(newGrid, row, col);
      }
    }
  }

  return newGrid;
};

export const showError = (message: string) => {
  toaster.create({
    id: "error-toast-id",
    title: "Invalid Move",
    description: message,
    type: "error",
    duration: 2000,
  });
};
