import LinkedList from "./LinkedList.js";

class HashMap {
  constructor() {}
  #array = [];
  #bucketLength = 16;

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(i)) % this.#bucketLength;
    }

    return hashCode;
  }

  set(key, value) {
    let index = this.hash(key);
    if (index < 0 || index >= this.#bucketLength) {
      throw new Error("Trying to access index out of bound");
    }
    if (this.#array[index] === undefined) {
      this.#array[index] = new LinkedList();
      this.#array[index].append(value, key);
    } else {
      if (this.#array[index].containsKey(key)) {
        let existingNodeIndex = this.#array[index].findKey(key);
        this.#array[index].removeAt(existingNodeIndex);
        this.#array[index].append(value, key);
      } else {
        this.#array[index].append(value, key);
      }
    }
  }

  get(key) {
    let index = this.hash(key);
    if (index < 0 || index >= this.#bucketLength) {
      throw new Error("Trying to access index out of bound");
    }
    let bucket = this.#array[index];
    if (bucket !== undefined && bucket.containsKey(key)) {
      let existingNodeIndex = bucket.findKey(key);
      return bucket.at(existingNodeIndex).data;
    }
    return null;
  }

  has(key) {
    let index = this.hash(key);
    if (index < 0 || index >= this.#bucketLength) {
      throw new Error("Trying to access index out of bound");
    }
    let bucket = this.#array[index];
    if (bucket !== undefined && bucket.containsKey(key)) {
      return true;
    }
    return false;
  }

  remove(key) {
    let index = this.hash(key);
    if (index < 0 || index >= this.#bucketLength) {
      throw new Error("Trying to access index out of bound");
    }
    if (
      this.#array[index] !== undefined &&
      this.#array[index].containsKey(key)
    ) {
      let existingNodeIndex = this.#array[index].findKey(key);
      this.#array[index].removeAt(existingNodeIndex);
    }
  }

  length() {
    let size = 0;
    for(let i = 0;i < this.#bucketLength; i++){
      let bucket = this.#array[i];
      if(bucket === undefined) continue;
      size += bucket.size();
    }
    return size;
  }

  clear() {
    for(let i = 0;i < this.#bucketLength; i++){
      this.#array[i] = undefined;
    }
  }

  keys() {
    let arr = [];
    for(let i = 0;i < this.#bucketLength; i++){
      let bucket = this.#array[i];
      if( bucket === undefined) continue;
      arr = arr.concat(bucket.allKeys());
    }
    return arr;
  }

  values() {}

  entries() {}
}

export default HashMap;
