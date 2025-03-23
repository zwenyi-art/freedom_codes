const { public_random_server, myShadowSocks } = require("../models/Servers");
const ispMappings = require("../ispMappings.json");
const axios = require("axios");

const getFriendlyISPName = (isp) => {
  return ispMappings[isp] || isp;
};

const serverStatusCheck = async () => {
  try {
    const response = await axios.get(process.env.API_LIST, {
      headers: {
        Authorization:
          "Bearer 3bc56a91a63422c64caa4786fbf39b76ed727c7e0f9a4b8c1241d1cb769fea90973b2336d5b09eb24b69d6619843b72caa49a4812d6e15641d3c0feba399f780", // Secure token!
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      console.log("Server is down");
      return 0;
    }
  }
  console.log("Server status check okay");
};

const getAllServersStatus = async (req, res) => {
  const data = await public_random_server.findOne({ tag: "random_servers" });
  const myShadowSocksData = await myShadowSocks.find().lean();

  try {
    const isp_list = data?.public_servers.map((data) => {
      return {
        providerName: data?.isp,
        isp: getFriendlyISPName(data?.isp),
        server_count: 0,
      };
    });
    for (let ssData of myShadowSocksData) {
      // console.log(ssData.isp); //array of isp
      for (let isp of ssData.isp) {
        // console.log(isp);
        const index = isp_list.findIndex((data) => data.providerName === isp);
        if (index !== -1) {
          isp_list[index].server_count += 1;
        }
      }
    }
    const result = isp_list.map((data) => {
      return {
        isp: data.isp,
        server_count: data.server_count,
        total: myShadowSocksData.length,
        percentage: (
          (data.server_count / myShadowSocksData.length) *
          100
        ).toFixed(2),
      };
    });
    return result;
    // console.log(myShadowSocksData.length);
  } catch (err) {
    console.log(err);
  }
};
module.exports = { getAllServersStatus, serverStatusCheck };
