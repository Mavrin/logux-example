module.exports = function (logux, data, handler = ()=>{}) {
  logux.log.on('event', function (event) {
    const {type, payload} = event;
    if(type === 'loadItems') {
      data.load(payload);
    }
    if(type === 'addItem') {
      data.addItem(payload);
    }
    if(type === 'removeItem') {
      data.removeItem(payload.id);
    }
    handler(data);
  });
};