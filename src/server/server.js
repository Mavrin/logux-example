const Server = require('logux-server').Server;
const path = require('path');
const fs = require('fs');
const pathToData = path.resolve('data.json');
const loguxEventsHandler = require('../loguxEventsHandler');

const { storage } = require('../storage');

const app = new Server({
  subprotocol: '1.0.0',
  supports: '1.x',
  root: __dirname
});

function senInitialData(projId) {
  setTimeout(function () {
    const initalData  = JSON.parse(fs.readFileSync(pathToData));
    app.log.add({
      type: 'loadItems',
      channel: `project/${projId}`,
      payload: {
        items: initalData.items
      }
    });
  }, 50);
}

app.auth((token) => {
  // Sending initial state
  senInitialData('test');
  return Promise.resolve(true);
});

app.channel('project/:id', (params, action, meta, creator) => {
  return true
})

loguxEventsHandler(app, storage, (storage) => {
  fs.writeFileSync(pathToData, JSON.stringify({items: storage.getItems()}));
});

app.type('addItem', {
  access (action, meta, creator) {
    return true
  },
  process (action) {
    return true
  }
})

app.type('removeItem', {
  access (action, meta, creator) {
    return true
  },
  process (action) {
    return true
  }
})

if (app.env === 'production') {
  app.listen({ cert: 'cert.pem', key: 'key.pem' })
} else {
  app.listen()
}