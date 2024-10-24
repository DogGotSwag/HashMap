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
    } else {
      let bucket = this.#array[index];
      if (bucket === undefined) {
        
      }
    }
  }

  get(key) {}

  has(key) {}

  remove(key) {}

  length() {}

  clear() {}

  keys() {}

  values() {}

  entries() {}
}

export default HashMap;
