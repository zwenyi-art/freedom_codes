const randomizeServer = async (array, numElements) => {
  const array_index = [];
  const result = [];
  const length = array.length;
  for (let i = 0; i < numElements; i++) {
    const randomIndex = Math.floor(Math.random() * length);
    if (!array_index.includes(randomIndex)) {
      array_index.push(randomIndex);
    }
    // result.push(array[randomIndex]);
  }
  for (let j of array_index) {
    result.push(array[j]);
  }
  return result;
};
module.exports = randomizeServer;
