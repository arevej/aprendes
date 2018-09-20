export function compareArrays(a, b) {
  if (a && b) {
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  }
  return false;
}

export function flatten(array) {
  return array.reduce((acc, arr) => {
    return [...acc, ...arr];
  }, []);
}

export function shuffle(array) {
  let m = array.length;
  let t;
  let i;

  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}
