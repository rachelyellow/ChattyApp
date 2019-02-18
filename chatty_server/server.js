// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

const colorArray = ["red", "blue", "green", "purple", "pink", "orange", "brown", "yellow", "gray"];

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  function updateNumOfUsers () {
    let totalUsers = {
      type: "incomingUserCount",
      users: 0
    };
    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        totalUsers.users = wss.clients.size;
        client.send(JSON.stringify(totalUsers));
      }});
    }

    // function updateUserList () {
    //   let activeUsers = {
    //     type: "incomingUserList",
    //     users: []
    //   }
    //   wss.clients.forEach((client) => {
    //     if (client.readyState === ws.OPEN) {
    //       activeUsers.users.push(client.userHandle);
    //       const activeUserList = JSON.stringify(activeUsers);
    //       client.send(activeUserList);
    //     }
    //   })
    // }

    
    updateNumOfUsers();
    // ws.userHandle = "Anonymous";
    ws.color = assignColor();
    // updateUserList();

  function assignColor () {
    const randomNum = Math.floor(Math.random() * 9);
    const randomColor = colorArray[randomNum];
    return randomColor;
  }


  function transformUserMsg (message) {
    const id = uuidv1();
    const returnMsg = JSON.parse(message);
    returnMsg["id"] = id;
    returnMsg["color"] = ws.color;
    returnMsg["type"] = "incomingMessage"
    return JSON.stringify(returnMsg);
  }
  
  function transformSystemMsg (message) {
    const returnMsg = JSON.parse(message);
    returnMsg["type"] = "incomingNotification"
    ws.userHandle = returnMsg.userHandle;
    return JSON.stringify(returnMsg);
  }
  
  ws.on('message', (message) => {
    const parsedMsg = JSON.parse(message);
    let returnMsg;
    if (parsedMsg.type === "postMessage") {
      returnMsg = transformUserMsg(message);
    } else {
      returnMsg = transformSystemMsg(message);
      // updateUserList();
    }
    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(returnMsg);
      }});
    });
    
    
    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
    ws.on('close', () => {
      console.log('Client disconnected')
      updateNumOfUsers();
      // updateUserList();
    });
  });