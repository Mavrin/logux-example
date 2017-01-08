const Client = require('logux-client/client');
const { renderList, onAddItem, onRemoveItem } = require('./list');
const server = document.querySelector('meta[name=server]');
const token = document.querySelector('meta[name=token]');
const { storage } = require('../storage');
const loguxEventsHandler = require('../loguxEventsHandler');

const logux = new Client({
  credentials: token.content,
  subprotocol: '1.0.0',
  url: server.content
});


logux.sync.connection.connect();

const status = document.querySelector('#status');
logux.sync.on('state', function () {
  let offline = 'offline';
  let online = 'online';
  status.classList.remove(online, offline);
  if (logux.sync.connected) {
    status.textContent = online;
    status.classList.add(online);
  } else {
    status.textContent = offline;
    status.classList.add(offline)
  }
});

loguxEventsHandler(logux, storage, (storage) => {
  renderList(storage.getItems());
});

onAddItem(function(payload) {
  logux.log.add({
    type: 'addItem',
    payload
  });
});
onRemoveItem(function(payload) {
  logux.log.add({
    type: 'removeItem',
    payload
  });
});
