var complex = {
  header: function() {
    return "Colors";
  },
  item: [
      {name: "red", current: true, url: "#Red"},
      {name: "green", current: false, url: "#Green"},
      {name: "blue", current: false, url: "#Blue"}
  ],
  list: function(object, fn) {
    if (this.item.length !== 0) {
      return fn(this);
    }
  },
  empty: function(object, fn) {
    if (this.item.length === 0) {
      return fn(this);
    }
  }
};
