# Game: Vietnamese Gomoku (five in a row, caro)
## Feature 
- real time chat
- manage user and game
- authenticate (password, jwt)
- database: postgresql, typeorm
- api document: swagger

## Game bussiness
- user can register new account using email and password, account need verify email before log-in
- user will has base score (1000)
- wind the game user can get scores base on score of user and apponent
- user can chat with other users in public chat room
- user can create game (with / without game password + can set round time (default 20s)) => game will display in to game list
- user can join the game from game list
    + user can play game
    + user can view moves history after game finish
    + private room chat in the game
    + after game finish user can send re-play new game
    + user can send 'with-draw' request
    + user can send surender request
- user with role admin can create tournament
    + tournament will limit time
    + tournament will rank user real time

- use can see user info: game played, email, change password ...