const { v4: uuidv4 } = require("uuid");
const couponGen = () => {
  return uuidv4().split("-")[0];
};
module.exports = { couponGen };
