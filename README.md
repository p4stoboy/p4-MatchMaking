# p4-MatchMaking
Nodejs / websocket matchmaking service template

# Installation
- `npm i --dev`

# Build project
- `npm run compile` (output in `./build`)

# Usage
- comments are fairly self explanatory.
- this is using a `Map()` object for the matchmaking pool so all iteration / matching prioritises the players who have been in queue the longest.
- Type def for player object expected from clients is in `./src/tools.ts`, you will need to modify the object that is created on the message event in `./src/index.ts` to suit your purposes.
- modify `is_match()` function in `./src/index.ts` to suit your purposes.
- modify `do_battle()` function in `./src/index.ts` to handle post-matching logic the way you want.

# Run test client
- after building project, start `index.js` in `./build/src`
- start `test_client.js`
- output is from client side sockets opened in `test_client.js`

![test_client](https://media.giphy.com/media/bxfq9gP0HBjQVts0PZ/giphy.gif)

# Contact
- contact me [here](https://discord.gg/frA9tys).
