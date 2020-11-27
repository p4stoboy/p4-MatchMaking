import * as web_socket from 'ws';
import {allowed_clients, UnmatchedPlayer, MatchingPlayer} from './tools';

//// CONSTANTS
const _PORT = 8080;
const MAX_TIME_IN_QUEUE = 20000;
const POOL_POLL_INTERVAL = 1000;
//
const wss = new web_socket.Server({port: _PORT});
const mm_pool = new Map<string, MatchingPlayer>();

wss.on('connection', (ws, req) => {
  // this uses ws:// via the ws library's own http server, if you need to use wss:// you will need to pass your own https server in to
  // the web_socket.Server() constructor.

  // make sure client ip is in ./tools.allowed_clients :: can remove this / implement your own verification if need be.
  const ip = req.socket.remoteAddress ? req.socket.remoteAddress.slice(7) : '';
  console.log('received connection from: ' + ip);

  if (!ip || !allowed_clients.includes(ip)) {
    console.log(`unauthorised ip ${ip ? ip : '(no ip)'}`);
    ws.close();
    return;
  }
  //

  //receive player info
  ws.on('message', message => {
    const player = JSON.parse(message.toString());
    const p: UnmatchedPlayer = {
      // parse message from client as UnmatchedPlayer :: NO TYPE CHECKING HAS BEEN IMPLEMENTED.
      id: player.id,
      time_joined: Date.now(),
      val_1: player.val_1,
      val_2: player.val_2,
    };
    // add player to pool if they are not already in pool
    if (!mm_pool.has(p.id)) {
      mm_pool.set(p.id, {socket: ws, player: p});
    } else {
      ws.close();
    }
  });
});

console.log(`running on port ${_PORT}`);

// ITERATE THROUGH POOL AND MATCH PLAYERS
function match_make(mm_pool: Map<string, MatchingPlayer>) {
  if (mm_pool.size < 1) {
    return;
  }
  for (const [A, p1] of mm_pool) {
    for (const [B, p2] of mm_pool) {
      if (is_match(p1, p2)) {
        const a = mm_pool.get(A);
        const b = mm_pool.get(B);
        if (a && b) {
          do_battle({...a}, {...b});
          mm_pool.delete(A);
          mm_pool.delete(B);
        }
      } else {
        const b = mm_pool.get(B);
        if (b && Date.now() - b.player.time_joined > MAX_TIME_IN_QUEUE) {
          b.socket.send(`${b.player.id}  didn't find a match.`);
          b.socket.close();
          mm_pool.delete(B);
        }
      }
    }
  }
}

// DETERMINES IF 2 PLAYERS ARE A MATCH
function is_match(p1: MatchingPlayer, p2: MatchingPlayer): boolean {
  // any condition you want here
  if (p1 !== p2) {
    return true;
  }
  return false;
}

// HANDLE MATCHING LOGIC / CLOSE SOCKETS WHEN DONE.
async function do_battle(p1: MatchingPlayer, p2: MatchingPlayer) {
  p1.socket.send(`${p1.player.id} you were matched with ${p2.player.id}`);
  p2.socket.send(`${p2.player.id} you were matched with ${p1.player.id}`);
  p1.socket.close();
  p2.socket.close();
}

// CHECK POOL FOR MATCHES EVERY POOL_POLL_INTERVAL / 1000 SECONDS
setInterval(() => match_make(mm_pool), POOL_POLL_INTERVAL);
