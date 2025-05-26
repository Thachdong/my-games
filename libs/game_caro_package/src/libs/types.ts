type TSquare = {
  value: null | 'X' | 'O';
  position: {
    x: number;
    y: number;
  };
  createdAt?: number;
};

export interface IGame {
  squares: TSquare[][];
  gameStatus: 'playing' | 'X' | 'O' | 'draw';
}
