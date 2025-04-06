import { COLS, ROWS, WIN_LENGTH } from './constants';
import { IGame } from './types';

/**
 * Generate a new board
 * @returns {IGame['squares']}
 */
export function generateBoard(): IGame['squares'] {
  const board = Array(ROWS)
    .fill(null)
    .map((_, row) =>
      Array(COLS)
        .fill(null)
        .map((_, col) => ({
          value: null,
          position: { x: col, y: row },
        }))
    );

  return board;
}

/**
 * Check if there is a winner
 * @param {IGame['squares']} board
 * @param {number} row
 * @param {number} col
 * @returns {IGame['gameStatus']}
 */
export function checkWinner(
  board: IGame['squares'],
  row: number,
  col: number
): 'X' | 'O' | null {
  const value = board[row][col].value;
  if (!value) return null;

  // Check horizontal
  let count = 1;
  for (let i = 1; col + i < COLS && board[row][col + i].value === value; i++)
    count++;
  for (let i = 1; col - i >= 0 && board[row][col - i].value === value; i++)
    count++;
  if (count >= WIN_LENGTH) return value;

  // Check vertical
  count = 1;
  for (let i = 1; row + i < ROWS && board[row + i][col].value === value; i++)
    count++;
  for (let i = 1; row - i >= 0 && board[row - i][col].value === value; i++)
    count++;
  if (count >= WIN_LENGTH) return value;

  // Check diagonal \
  count = 1;
  for (
    let i = 1;
    row + i < ROWS && col + i < COLS && board[row + i][col + i].value === value;
    i++
  )
    count++;
  for (
    let i = 1;
    row - i >= 0 && col - i >= 0 && board[row - i][col - i].value === value;
    i++
  )
    count++;
  if (count >= WIN_LENGTH) return value;

  // Check diagonal /
  count = 1;
  for (
    let i = 1;
    row - i >= 0 && col + i < COLS && board[row - i][col + i].value === value;
    i++
  )
    count++;
  for (
    let i = 1;
    row + i < ROWS && col - i >= 0 && board[row + i][col - i].value === value;
    i++
  )
    count++;
  if (count >= WIN_LENGTH) return value;

  return null;
}

/**
 * Check if the game is a draw
 * @param {IGame['squares']} board
 * @returns {boolean}
 */
export function checkDraw(board: IGame['squares']): boolean {
  return board.every((row) => row.every((square) => square.value !== null));
}
