const { sign_box_config_genMod } = require("../generator/SingBoxGen");
const { client } = require("../configs/dbConn");
const SingBoxConfigure = require("../generator/singBoxConfig");
const {
  ssh,
  ss,
  public_random_server,
  vmess,
  myShadowSocks,
} = require("../models/Servers");
const randomizeServer = require("../utils/randomizeServer");
const updateRandomServers = async (req, res) => {
  // const data = await public_random_server.find({ tag: "public_random_server" });

  const data = await myShadowSocks.find().lean();

  const SSH = await ssh.aggregate([
    { $match: { type: "ssh" } }, // Filter documents with type 'ssh'
    { $sample: { size: 3 } }, // Randomly select 1 document
  ]);
  const SS = await ss.aggregate([
    { $match: { type: "shadowsocks" } }, // Filter documents with type 'ssh'
    { $sample: { size: 3 } }, // Randomly select 1 document
  ]);
  const VMESS = await vmess.aggregate([
    { $match: { type: "vmess" } }, // Filter documents with type 'ssh'
    { $sample: { size: 3 } }, // Randomly select 1 document
  ]);

  const ISP_List = data
    .map((data) => data?.isp)
    .filter((data) => data.length > 0)
    .flat();
  const Unique_ISP_List = [...new Set(ISP_List)];
  // console.log(Unique_ISP_List);
  // const randomizer = await randomizeServer(isp,data, 15);
  const private_serverData = [...VMESS, ...SSH, ...SS];

  // const new_public_config = new SingBoxConfigure();
  // await new_public_config.addOutBound("🖥 Load balancing", serverData);
  // await new_public_config.addOutBound("☢️ Backup Runner", randomizer);

  // getting configures
  // const public_singbox_config = await new_public_config.getConfig();
  // const public_hiddify_config = await new_public_config.getServers();

  //update singbox_configure into database
  const foundConfig = await public_random_server.findOne({
    tag: "random_servers",
  });
  // when doesn't found database it will create
  try {
    if (!foundConfig) {
      await public_random_server.create({
        tag: "random_servers",
        public_servers: [],
        private_servers: [],
        isp_list: [],
      });
    }
    const z_isp_data = Unique_ISP_List.map(async (isp_data) => {
      return {
        isp: isp_data,
        random_server: await randomizeServer(isp_data, data, 30),
      };
    });
    //if not found document it will create pure doc

    //updating data
    await public_random_server.findOneAndUpdate(
      { tag: "random_servers" },
      {
        private_servers: private_serverData,
        isp_list: Unique_ISP_List,
      }
    );
    await Promise.all(z_isp_data)
      .then(async (data) => {
        await public_random_server.findOneAndUpdate(
          { tag: "random_servers" },
          {
            public_servers: data,
          }
        );
      })
      .finally(() => {
        console.log("success");
        res.status(200).json({ data: "random server updated" });
      });
  } catch (err) {
    console.log(err);
  }

  // const servers_data_isp = {
  //   isp: isp_data,
  //   random_server: await randomizeServer(isp_data, data, 15),
  // };

  // let result;
  // for (let isp_data of Unique_ISP_List) {
  //   const servers_data_isp = {
  //     isp: isp_data,
  //     random_server: await randomizeServer(isp_data, data, 15),
  //   };

  //   console.log("✅ Data to Insert: ", servers_data_isp);

  //   console.log("✅ Update Result: ", result);
  // }

  // const result = await random_server.findOneAndUpdate({
  //   singBox_config: public_singbox_config,
  //   hiddify_config: public_hiddify_config,
  //   servers: serverData,
  // });
  // const result = await random_server.create({ config: public_config });

  // res.status(200).json({ data: "random server updated", data: result });
};

function fisherYatesShuffle(array, array_size, serverAmount) {
  let n = array_size;
  while (n > 1) {
    n--;
    let j = Math.floor(Math.random() * (n + 1));
    [array[n], array[j]] = [array[j], array[n]];
  }
  const result = array.slice(0, serverAmount).sort(function (a, b) {
    return a - b;
  });
  return result;
}

const generateRandomServers = async (req, res) => {
  const now = Date.now();
  const ttlSeconds = 5 * 60;
  const { ispType, serverAmount } = req.body;
  const userId = Number(req.user_id);
  const array_size = await myShadowSocks.find({}).countDocuments();
  const SSH = await ssh.aggregate([
    { $match: { type: "ssh" } }, // Filter documents with type 'ssh'
    { $sample: { size: 3 } }, // Randomly select 1 document
  ]);
  const SS = await ss.aggregate([
    { $match: { type: "shadowsocks" } }, // Filter documents with type 'ssh'
    { $sample: { size: 3 } }, // Randomly select 1 document
  ]);
  const VMESS = await vmess.aggregate([
    { $match: { type: "vmess" } }, // Filter documents with type 'ssh'
    { $sample: { size: 3 } }, // Randomly select 1 document
  ]);
  const private_serverData = [...VMESS, ...SSH, ...SS];
  // const result = await randomizeServer(ispType, data, 20);
  let array = Array.from({ length: array_size }, (_, i) => i);
  const random_index = fisherYatesShuffle(array, array_size, serverAmount);
  const isp_regex = new RegExp(ispType, "i");
  const random_data = await myShadowSocks
    .find({
      index: { $in: random_index },
      "data.isp": { $in: [isp_regex] },
    })
    .select("data -_id");

  // const z_data = random_data["_doc"]["data"];

  // for (let z = 0; z < random_data.length; z++) {
  //   console.log(random_data[z]["_doc"]["data"]);
  // }
  const new_public_config = new SingBoxConfigure();
  await new_public_config.addOutBound("🖥 Load balancing", private_serverData);
  await new_public_config.addOutBound("☢️ Backup Runner", random_data);

  // getting configures
  const public_singbox_config = await new_public_config.getConfig();
  const public_hiddify_config = await new_public_config.getServers();

  // lastItem = array_size[array_size.length - 1];
  const personal_data = {
    userId: userId,
    ispType: ispType,
    timestamp: now,
    expiresAt: now + ttlSeconds * 1000,
    serverAmount: serverAmount,
    singbox_config: public_singbox_config,
    hiddify_config: public_hiddify_config,
    random_server: random_data.length,
  };
  client.setEx(`userId:${userId}`, ttlSeconds, JSON.stringify(personal_data)); // Cache for 1 hour

  res.status(200).json({ msg: true, data: personal_data });
};

const getUserServerConfigure = async (req, res) => {
  const { id } = req.params;
  const cache = await client.get(`userId:${id}`);
  const userAgent = req.get("User-Agent");
  if (cache) {
    const data = JSON.parse(cache);
    if (data.expiresAt < Date.now()) {
      return res.status(200).json({ data: "Cache expired" });
    }

    if (userAgent.includes("sing-box")) {
      const singbox_config = data?.singbox_config;
      return res.status(200).json(singbox_config);
    }
    if (userAgent.includes("Hiddify")) {
      console.log("hiddify config");
      return res.status(200).json(data?.hiddify_config);
    }
    return res.status(200).json(data);
  }
  return res.status(200).json({ msg: "Invalid Configure" });
};

module.exports = {
  updateRandomServers,
  generateRandomServers,
  getUserServerConfigure,
};
