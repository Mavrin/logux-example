const { v4 } = require('uuid');
const ul = document.querySelector('.todo-list');

function renderItem({ value, id }) {
  return `
          <li>
              <div class="view">
                  <label>${value}</label>
                  <button data-id=${id} class="destroy"></button>
              </div>
              <input class="edit" value="${value}">
          </li>
          `;
}

function renderList(items) {
  ul.innerHTML = items.map(renderItem).join('');
}

module.exports = {
  renderList,
  onAddItem(cb) {
    document.addEventListener('submit', function (evt) {
      evt.preventDefault();
      let input = evt.target.querySelector('input');
      const value = input.value;
      input.value = '';
      if (value) {
        const payload = { id: v4(), value };
        cb(payload);
      }
    });
  },
  onRemoveItem(cb) {
    document.addEventListener('click', function (evt) {
      let target = evt.target;
      if (target.classList.contains('destroy')) {
        const payload = { id: target.dataset.id };
        cb(payload);
      }
    });
  }
};