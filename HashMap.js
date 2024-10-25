import LinkedList from "./LinkedList.js";

function isPrime(num) {
  if (num <= 1) {
    return false;
  }
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }

  return true;
}

function checkPowerProximity(num) {
  let powerOf = 1;
  let currPowerOfTwo = 2 ** powerOf;
  let prevPowerOfTwo;
  while (currPowerOfTwo < num) {
    powerOf += 1;
    [prevPowerOfTwo, currPowerOfTwo] = [currPowerOfTwo, 2 ** powerOf];
  }

  let distanceOne = Math.abs(currPowerOfTwo - num);
  let distanceTwo = Math.abs(num - prevPowerOfTwo);

  return distanceOne >= distanceTwo ? distanceTwo : distanceOne;
}

function nextPrime(num) {
  let newNum = num * 2;
  while (!isPrime(newNum) && checkPowerProximity(newNum) < 7) {
    newNum += 1;
  }
  return newNum;
}

class HashMap {
  constructor() {}
  #array = [];
  #bucketLength = 16;
  #loadFactor = 0.75;
  growHash() {
    let entries = this.entries();
    if (entries.length > Math.round(this.#bucketLength * this.#loadFactor)) {
      this.clear();
      this.#bucketLength = nextPrime(this.#bucketLength);
      for(let i = 0; i < entries.length ;i++){
        this.set(entries[i][0],entries[i][0]);
      }
    }
  }

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
    for (let i = 0; i < this.#bucketLength; i++) {
      let bucket = this.#array[i];
      if (bucket === undefined) continue;
      size += bucket.size();
    }
    return size;
  }

  clear() {
    for (let i = 0; i < this.#bucketLength; i++) {
      this.#array[i] = undefined;
    }
  }

  keys() {
    let arr = [];
    for (let i = 0; i < this.#bucketLength; i++) {
      let bucket = this.#array[i];
      if (bucket === undefined) continue;
      arr = arr.concat(bucket.allKeys());
    }
    return arr;
  }

  values() {
    let arr = [];
    for (let i = 0; i < this.#bucketLength; i++) {
      let bucket = this.#array[i];
      if (bucket === undefined) continue;
      arr = arr.concat(bucket.allValues());
    }
    return arr;
  }

  entries() {
    let arr = [];
    for (let i = 0; i < this.#bucketLength; i++) {
      let bucket = this.#array[i];
      if (bucket === undefined) continue;
      arr = arr.concat(bucket.allKeysWithValues());
    }
    return arr;
  }
}

export default HashMap;
