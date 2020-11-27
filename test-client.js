const WebSocket = require('ws');
const url = 'ws://127.0.0.1:8080'; // SERVER ADDRESS

let i = 1;

function enter_mm() {
  const connection = new WebSocket(url);
  const player = {
    id: i,
    val_1: 7,
    val_2: ['string1', 'string2']
  };
  i++;
  connection.onopen = () => {
    connection.send(JSON.stringify(player));
  };

  connection.onerror = error => {
    console.log(error);
  };

  connection.onmessage = e => {
    console.log(e.data);
  };

  connection.onclose = () => {
    console.log('connection closed by host.');
  };
}

setInterval(() => enter_mm(), 100);
