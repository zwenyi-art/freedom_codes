const randomizeServer = async (isp_type, array, numElements) => {
  const array_index = [];
  const result = [];
  const length = array.length;
  let i = 0;
  while (i < numElements) {
    const randomIndex = Math.floor(Math.random() * length);

    if (!array_index.includes(randomIndex)) {
      if (array[randomIndex]["isp"].includes(isp_type)) {
        array_index.push(randomIndex);
        i++;
      }
    }
    // result.push(array[randomIndex]);
  }
  for (let j of array_index) {
    // console.log(array_index);
    // console.log(array[j]);
    result.push(array[j]);
  }
  return result;
};
module.exports = randomizeServer;
