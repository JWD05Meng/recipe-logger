
// returns a random int between max exclusive and min inclusive 
export const randInt = (maxEclu, min=0) => Math.floor(Math.random()*(maxEclu-min) + min);

// returns a random element of an array
export const randElem = (arr) => arr[randInt(arr.length)];

// inserts element [x] into array [arr] at index [i], returns the modified array.
const insert = (arr, x, i) => { arr.splice(i, 0, x); return arr; } 

// returns a new copy of array [arr] with elements in a random order
export const shuffleArray = arr => arr.reduce((acc, x) => insert(acc, x, randInt(acc.length+1)), []);

// returns a function that returns an incremented int each time it is called
export const counter = (() => {
  let i = 0;
  return () => i++;
})();

