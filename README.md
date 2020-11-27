# p4-MatchMaking
Nodejs matchmaking server template

# Installation
- `npm i --dev`

# Build project
- npm run compile (output in `./build`)

# Run test client
- after building project start index.js in `./build/src`
- start test_client.js

# Usage
- comments are fairly self explanatory.
- Type def for player object expected from clients is in `./src/tools.ts`, you will need to modify the object that is created on the message event in `./src/index.ts` 
to suit your purposes.
- modify `is_match()` function in `./src/index.ts` to suit your purposes.
- modify `do_battle()` function in `./src/index.ts` to handle post-matching logic the way you want.

# Contact
- contact me [here](https://discord.gg/frA9tys).
