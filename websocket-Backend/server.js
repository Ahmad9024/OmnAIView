const WebSocket = require('ws');

 const connection = (ws) => {
    console.log('Client verbunden');
    setInterval(() => {
      const message = Math.floor(Math.random() * 100);
      ws.send(JSON.stringify({ timestamp: Date.now(), value: message}));
    }, 1000);
  };

  const startServer = (port) => {
   const wss = new WebSocket.Server({ port });
   console.log(`WebSocket-Server läuft auf Port ${port}`);
   wss.on('connection', connection);

};

// Beispielport, kann durch das Eingabefeld der Website geändert werden.
startServer(8080);


