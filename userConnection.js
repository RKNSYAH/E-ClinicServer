const WebSocket = require('ws')
const wss = new WebSocket.Server({port : 8080})
const userConnections = {};
wss.on('connection', (ws, req) => {

  ws.on('message', (message => {
    const data = JSON.parse(message)
    console.log(data);
    if(data.channel === 'confirmation'){
      return userConnections[data.data] = ws
    }
    else if (data.channel === 'antrian'){
      return userConnections[data.data] = ws
    }
  }))
})

module.exports ={userConnections}