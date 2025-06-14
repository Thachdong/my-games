export const ROWS = 50; // number of rows in the board
export const COLS = 50; // number of columns in the board
export const CELL_SIZE = 32; // size of each cell in the board (px)
export const BOARD_SIZE = 750; // size of the board (px)
export const WIN_LENGTH = 5; // number of consecutive marks in a row to win
export const pagePaths = {
  home: '/',
  login: '/auth/login',
  register: '/auth/register',
  activate: '/auth/activate',
  changePassword: '/auth/change-password',
  forgotPassword: '/auth/forgot-password',
};

export enum EPagePath {
  HOME = '/',
  LOGIN = '/auth/login',
  REGISTER = '/auth/register',
  GAME = '/game',
  TOURNAMENT = '/tournament',
  PROFILE = '/profile',
}

export const LOCAL_STORAGE_KEYS = {
  AUTHENTICATED_USER: 'authenticatedUser',
};

export const DEFAULT_PAGE_SIZE = 25; // default number of items per page
