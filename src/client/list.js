const { v4 } = require('uuid');
const ul = document.querySelector('#list');

function renderItem(item) {
  const li = document.createElement('li');
  li.textContent = item.value;
  const button = document.createElement('button');
  button.textContent = 'x';
  button.dataSet = { id:item.id };
  li.appendChild(button);
  return li;
}

function renderList(items) {
  ul.innerHTML = '';
  items.forEach(appendItem);
}

function appendItem(item) {
  ul.appendChild(renderItem(item));
}
module.exports = {
  renderList,
  onAddItem(cb) {
    document.addEventListener('submit', function (evt) {
      evt.preventDefault();
      let input = evt.target.querySelector('input');
      const value = input.value;
      input.value = '';
      if(value) {
        const payload = {id: v4(), value};
        cb(payload);
      }
    });
  },
  onRemoveItem(cb) {
    document.addEventListener('click', function (evt) {
      let target = evt.target;
      if (target.tagName === 'BUTTON' && target.parentNode.tagName === 'LI') {
        evt.preventDefault();
        const payload = { id: target.dataSet.id };
        cb(payload);
      }
    });
  }
};