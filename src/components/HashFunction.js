const HashFunction = (props) => {
  class HashTable {
    constructor(size = 4) {
      this.keyMap = new Array(size);
    }
    _hash(key) {
      let total = 0;
      let prime = 31;

      for (let i = 0; i < Math.min(key.length, 100); i++) {
        let char = key[i];
        let value = char.charCodeAt(0) - 96;
        total = (total * prime + value) % this.keyMap.length;
      }
      if (total < 0) total = total * -1;
      return total;
    }
    set(key, value) {
      let index = this._hash(key);

      if (!this.keyMap[index]) {
        this.keyMap[index] = [];
      }
      this.keyMap[index].push([key, value]);

      return true;
    }
    get(key) {
      let index = this._hash(key);

      if (this.keyMap[index]) {
        for (let i = 0; i < this.keyMap.length; i++) {
          if (key === this.keyMap[index][i][0]) {
            return this.keyMap[index][i];
          }
        }
      }
      return false;
    }
    keys() {
      let arrOfKeys = [];
      let arr = this.keyMap;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i]) {
          for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j]) arrOfKeys.push(arr[i][j][0]);
          }
        }
      }

      return arrOfKeys;
    }
    values() {
      let arrOfValues = [];
      let arr = this.keyMap;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i]) {
          for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j]) arrOfValues.push(arr[i][j][1]);
          }
        }
      }

      return arrOfValues;
    }
  }

  let hash = new HashTable();

  hash.set("a", 1);
  hash.set("b", 2);
  hash.set("c", 3);
  hash.set("d", 4);
  hash.set("matan", 5);
};
export default HashFunction;
