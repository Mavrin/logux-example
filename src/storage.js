const storage = {
  items:[],
  load({items}) {
    this.items = items;
  },
  addItem(item) {
    this.items.push(item)
  },
  removeItem(removedId) {
    this.items = this.items.filter(({id}) => id !== removedId);
  },
  getItems() {
    return this.items;
  }
};

module.exports = {storage};