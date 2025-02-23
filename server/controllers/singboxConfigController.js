const { sign_box_config_genMod } = require("../generator/SingBoxGen");
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
  console.log(Unique_ISP_List);
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

const getRandomSingboxServers = async (req, res) => {
  const { isp = "ooredoo" } = req.query;
  const data = await public_random_server.findOne({ tag: "random_servers" });
  try {
    const isp_public_server = data?.public_servers.filter((data) => {
      const isp_list = data?.isp.toLowerCase();
      if (isp_list?.includes(isp.toLowerCase())) {
        return data;
      }
    });
    // console.log(isp_public_server);
    const new_public_config = new SingBoxConfigure();
    await Promise.all([
      await new_public_config.addOutBound(
        "🖥 Load balancing",
        data?.private_servers
      ),
      await new_public_config.addOutBound(
        "☢️ Backup Runner",
        isp_public_server[0]["random_server"]
      ),
    ]);
    const public_singbox_config = await new_public_config.getConfig();
    res.status(200).json(public_singbox_config);
  } catch (err) {
    res.status(200).json({ data: "unsupported isp" });
  }
};

const getRandomHiddifyServers = async (req, res) => {
  const { isp = "ooredoo" } = req.query;
  const data = await public_random_server.findOne({ tag: "random_servers" });
  try {
    const isp_public_server = data?.public_servers.filter((data) => {
      const isp_list = data?.isp.toLowerCase();
      if (isp_list?.includes(isp.toLowerCase())) {
        return data;
      }
    });
    // console.log(isp_public_server);
    const new_public_config = new SingBoxConfigure();
    await Promise.all([
      await new_public_config.addOutBound(
        "🖥 Load balancing",
        data?.private_servers
      ),
      await new_public_config.addOutBound(
        "☢️ Backup Runner",
        isp_public_server[0]["random_server"]
      ),
    ]);
    const public_hiddify_config = await new_public_config.getServers();
    res.status(200).json(public_hiddify_config);
  } catch (err) {
    res.status(200).json({ data: "unsupported isp" });
  }
};
module.exports = {
  updateRandomServers,
  getRandomSingboxServers,
  getRandomHiddifyServers,
};
