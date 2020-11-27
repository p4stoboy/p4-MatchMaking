import WebSocket = require('ws');

export const allowed_clients = ['127.0.0.1'];

export type UnmatchedPlayer = {
  //any properties your player objects need (MUST HAVE UNIQUE ID)
  id: string;
  time_joined: number;
  val_1: number;
  val_2: Array<string>;
  //etc
};

export interface MatchingPlayer {
  player: UnmatchedPlayer;
  socket: WebSocket;
}
