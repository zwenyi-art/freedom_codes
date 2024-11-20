const { sign_box_config_genMod } = require("../generator/SingBoxGen");
const {
  ssh,
  ss,
  public_servers,
  vmess,
  random_server,
} = require("../models/Servers");
const randomizeServer = require("../utils/randomizeServer");

const updateRandomServers = async (req, res) => {
  const data = await public_servers.find({ tag: "public_servers" });
  const SSH = await ssh.aggregate([
    { $match: { type: "ssh" } }, // Filter documents with type 'ssh'
    { $sample: { size: 1 } }, // Randomly select 1 document
  ]);
  const SS = await ss.aggregate([
    { $match: { type: "shadowsocks" } }, // Filter documents with type 'ssh'
    { $sample: { size: 2 } }, // Randomly select 1 document
  ]);
  const VMESS = await vmess.aggregate([
    { $match: { type: "vmess" } }, // Filter documents with type 'ssh'
    { $sample: { size: 2 } }, // Randomly select 1 document
  ]);
  console.log("here is getting ", VMESS);
  const randomizer = await randomizeServer(data[0].servers, 15);
  // const serverData = [...SSH, ...randomizer, ...SS];
  const serverData = [...VMESS, ...randomizer, ...SSH, ...SS];
  const public_config = await sign_box_config_genMod(serverData);
  // const public_config = await sign_box_config_gen(serverData);
  // res.status(200).json(public_config);
  // console.log(public_config);
  const foundConfig = await random_server.findOne({ tag: "random_servers" });
  if (!foundConfig) {
    await random_server.create({
      config: public_config,
      tag: "random_servers",
      servers: serverData,
    });
  }
  const result = await random_server.findOneAndUpdate({
    config: public_config,
    servers: serverData,
  });
  // const result = await random_server.create({ config: public_config });
  res.status(200).json({ data: "random server updated", data: result });
};

const getRandomServers = async (req, res) => {
  const data = await random_server.findOne({ tag: "random_servers" });
  // console.log(data.config);
  res.status(200).json(data.config);
};
module.exports = {
  updateRandomServers,
  getRandomServers,
};
