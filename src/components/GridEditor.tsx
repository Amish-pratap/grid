import React, { useState } from "react";
import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";

import { Tooltip } from "./ui/tooltip";
import {
  createEmptyGrid,
  generateRandomGrid,
  getColumnCounts,
  getRowCounts,
  hasSquarePattern,
  MAX_FILLED_PER_LINE,
  showError,
  updateNeighbors,
} from "@/gridsUtility";

const GridEditor = () => {
  const [grid, setGrid] = useState(createEmptyGrid());

  const handleCellClick = (row: number, col: number) => {
    const newGrid = grid.map((row) => [...row]);
    const newValue = grid[row][col] === 0 ? 1 : 0;

    // Check constraints before applying the change
    if (newValue === 1) {
      const rowCount = newGrid[row].reduce((sum, cell) => sum + cell, 0);
      const colCount = newGrid.reduce((sum, row) => sum + row[col], 0);

      if (rowCount >= MAX_FILLED_PER_LINE) {
        showError("Maximum 3 filled cells per row allowed");
        return;
      }

      if (colCount >= MAX_FILLED_PER_LINE) {
        showError("Maximum 3 filled cells per column allowed");
        return;
      }
    }

    newGrid[row][col] = newValue;

    if (newValue === 1) {
      // Check for 2x2 pattern
      if (hasSquarePattern(newGrid, row, col)) {
        showError("Cannot form 2x2 squares of filled cells");
        return;
      }

      // Update neighbors if cell was filled
      const finalGrid = updateNeighbors(newGrid, row, col);
      setGrid(finalGrid);
    } else {
      setGrid(newGrid);
    }
  };

  // Reset grid
  const handleReset = () => {
    setGrid(createEmptyGrid());
  };

  // Random fill (respecting constraints)
  const handleRandomFill = () => {
    setGrid(generateRandomGrid());
  };

  return (
    <VStack w={"100vw"} h={"100vh"} p={2}>
      <VStack pt={5}>
        <Box>
          <HStack gap={"1px"} ml={2} mb={2}>
            <Box w={[6, null, 8]} h={[6, null, 8]} />
            {getColumnCounts(grid).map((count, i) => (
              <Box
                borderRadius={"full"}
                bg={"black"}
                color={"white"}
                key={`row-${i}`}
                h={[6, null, 8]}
                w={[6, null, 8]}
                display="flex"
                alignItems="center"
                justifyContent={"center"}
              >
                <Text>{count}</Text>
              </Box>
            ))}
          </HStack>
          <HStack gap={2}>
            <VStack gap={"1px"}>
              {getRowCounts(grid).map((count, i) => (
                <Box
                  borderRadius={"full"}
                  bg={"black"}
                  color={"white"}
                  key={`row-${i}`}
                  h={[6, null, 8]}
                  w={[6, null, 8]}
                  display="flex"
                  alignItems="center"
                  justifyContent={"center"}
                >
                  <Text>{count}</Text>
                </Box>
              ))}
            </VStack>

            <SimpleGrid
              flexShrink={0}
              overflow={"hidden"}
              columns={10}
              border={"1px solid black"}
              borderRadius={"8px"}
              gap={"1px"}
              bg={"black"}
            >
              {grid.map((row, i) =>
                row.map((cell, j) => (
                  <Tooltip
                    key={`${i}-${j}`}
                    content={`Cell (${i},${j}): ${cell ? "Filled" : "Empty"}`}
                  >
                    <Box
                      onClick={() => handleCellClick(i, j)}
                      w={[6, null, 8]}
                      h={[6, null, 8]}
                      cursor="pointer"
                      border="1px"
                      borderColor="gray.300"
                      bg={cell ? "blue.500" : "white"}
                      _hover={{
                        bg: cell ? "blue.600" : "blue.50",
                      }}
                      transition="background-color 0.2s"
                    />
                  </Tooltip>
                ))
              )}
            </SimpleGrid>
          </HStack>
        </Box>
      </VStack>
      <HStack gap={4} mt={4}>
        <HStack>
          <Box
            w={4}
            h={4}
            border="1px solid black"
            borderRadius={"4px"}
            borderColor="gray.300"
            bg="white"
          />
          <Text>Empty (0)</Text>
        </HStack>
        <HStack>
          <Box
            w={4}
            h={4}
            border="1px solid black"
            borderRadius={"4px"}
            borderColor="gray.300"
            bg="blue.500"
          />
          <Text>Filled (1)</Text>
        </HStack>
      </HStack>
      <HStack gap={4}>
        <Button onClick={handleReset} colorScheme="red">
          Reset Grid
        </Button>
        <Button onClick={handleRandomFill} colorScheme="blue">
          Random Fill
        </Button>
      </HStack>
    </VStack>
  );
};

export default GridEditor;
