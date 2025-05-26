import React from 'react';
import {
  ROWS,
  COLS,
  CELL_SIZE,
  BOARD_SIZE,
  IGame,
  checkWinner,
  checkDraw,
} from 'game_caro_package/libs';
import './index.css';

type TGameBoardProps = {
  board: IGame['squares'];
  setBoard: React.Dispatch<React.SetStateAction<IGame['squares']>>;
  currentPlayer: 'X' | 'O';
  setCurrentPlayer: React.Dispatch<React.SetStateAction<'X' | 'O'>>;
  gameStatus: 'playing' | 'X' | 'O' | 'draw';
  setGameStatus: React.Dispatch<
    React.SetStateAction<'playing' | 'X' | 'O' | 'draw'>
  >;
};

export const GameBoard: React.FC<Readonly<TGameBoardProps>> = ({
  board,
  setBoard,
  currentPlayer,
  setCurrentPlayer,
  gameStatus,
  setGameStatus,
}) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [isMouseDown, setIsMouseDown] = React.useState(false);
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // #region -- callbacks
  // DRAW CANVAS BASED ON BOARD STATE
  const drawCanvas = React.useCallback(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    canvas.width = COLS * CELL_SIZE;
    canvas.height = ROWS * CELL_SIZE;

    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw board grid
    ctx.beginPath();
    ctx.strokeStyle = '#000';

    // Draw vertical lines
    for (let x = 0; x <= canvas.width; x += CELL_SIZE) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
    }

    // Draw horizontal lines
    for (let y = 0; y <= canvas.height; y += CELL_SIZE) {
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
    }

    ctx.stroke();

    // Draw X's and O's
    board.forEach((row) => {
      row.forEach((square) => {
        if (square.value) {
          const x = square.position.x * CELL_SIZE;
          const y = square.position.y * CELL_SIZE;
          if (square.value === 'X') {
            ctx.strokeStyle = 'red';
            ctx.beginPath();
            ctx.moveTo(x + 6, y + 6);
            ctx.lineTo(x + 26, y + 26);
            ctx.moveTo(x + 26, y + 6);
            ctx.lineTo(x + 6, y + 26);
            ctx.stroke();
          } else {
            ctx.strokeStyle = 'blue';
            ctx.beginPath();
            ctx.arc(x + 16, y + 16, 12, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      });
    });
  }, [board]);

  const handleMouseDown = React.useCallback(
    (event: React.MouseEvent) => {
      setIsMouseDown(true);
      setDragStart({ x: event.clientX, y: event.clientY });
      if (isDragging) {
        setIsDragging(false);
      }
    },
    [isDragging]
  );

  const handleMouseUp = React.useCallback(() => {
    setIsMouseDown(false);
    drawCanvas();
  }, [drawCanvas]);

  const handleMouseMove = React.useCallback(
    (event: React.MouseEvent) => {
      if (!isMouseDown || !containerRef.current) return;

      setIsDragging(true);
      const deltaX = event.clientX - dragStart.x;
      const deltaY = event.clientY - dragStart.y;
      containerRef.current.scrollBy(-deltaX, -deltaY);
      setDragStart({ x: event.clientX, y: event.clientY });
      drawCanvas();
    },
    [containerRef, dragStart, drawCanvas, isMouseDown]
  );

  const handleCanvasClick = React.useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      if (isDragging || gameStatus !== 'playing') return;

      const canvas = canvasRef.current;
      const container = containerRef.current;

      if (!canvas || !container) return;

      const x = Math.floor(event.nativeEvent.offsetX / CELL_SIZE);
      const y = Math.floor(event.nativeEvent.offsetY / CELL_SIZE);

      if (x >= 0 && x < COLS && y >= 0 && y < ROWS && !board[y][x].value) {
        const newBoard = [...board];

        newBoard[y][x].value = currentPlayer;

        newBoard[y][x].createdAt = Date.now();

        setBoard(newBoard);

        // Check for winner
        const winner = checkWinner(newBoard, y, x);
        if (winner) {
          setGameStatus(winner);
          return;
        }

        // Check for draw
        if (checkDraw(newBoard)) {
          setGameStatus('draw');
          return;
        }

        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      }
    },
    [
      board,
      currentPlayer,
      isDragging,
      gameStatus,
      setBoard,
      setCurrentPlayer,
      setGameStatus,
    ]
  );
  // #endregion

  // #region -- side effects
  // DRAW CANVAS ON BOARD CHANGE
  React.useEffect(() => {
    drawCanvas();
  }, [board, drawCanvas]);

  // SCROLL TO CENTER OF BOARD ON FIRST RENDER
  React.useEffect(() => {
    if (containerRef.current) {
      const CENTER_OF_X = (COLS * CELL_SIZE - BOARD_SIZE) / 2;
      const CENTER_OF_Y = (ROWS * CELL_SIZE - BOARD_SIZE) / 2;
      containerRef.current.scrollTo(CENTER_OF_X, CENTER_OF_Y);
    }
  }, []);
  // #endregion

  return (
    <div
      ref={containerRef}
      className={`scrollbar-hidden border-4 border-gray-500`}
      style={{
        width: `${BOARD_SIZE}px`,
        height: `${BOARD_SIZE}px`,
        borderColor: gameStatus === 'playing' ? 'green' : 'gray',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onScroll={() => drawCanvas()}
    >
      <canvas
        ref={canvasRef}
        id="game-caro-board"
        onMouseUp={handleCanvasClick}
        className={`${
          gameStatus === 'playing' ? 'cursor-default' : 'cursor-not-allowed'
        }`}
      />
    </div>
  );
};
