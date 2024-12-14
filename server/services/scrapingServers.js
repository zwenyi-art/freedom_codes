const { updatePublicServer } = require("../controllers/serversController");
const { checkMultipleSS_Servers } = require("../utils/connectionTester");
const fetchData = require("../utils/fetchData");
const processingLargeData = require("../utils/processingLargeData");

const scrapShadowSocks = async (req, res) => {
  const url = "https://pad.riseup.net/p/lez_uFcJoUlmalBOCyHt/export/txt";
  try {
    const data = await fetchData(url);
    const servers = await processingLargeData(data).catch(console.error);
    const checkedServers = await checkMultipleSS_Servers(servers);
    await updatePublicServer(checkedServers);
    res.status(200).json({ status: "successfully updated" });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { scrapShadowSocks };
