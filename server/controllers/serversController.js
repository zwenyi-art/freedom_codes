const {
  ssh,
  ss,
  vmess,
  public_servers,
  public_random_server,
} = require("../models/Servers");

// public servers
const updatePublicServer = async (data) => {
  await public_servers.findOneAndUpdate(
    { tag: "public_servers" },
    { servers: data },
    {
      new: true,
      runValidators: true,
    }
  );
};

const createPublicServer = async (data) => {
  await public_servers.create({
    tag: "public_servers",
    servers: data,
  });
};

const getAllPublicServers = async (req, res) => {
  const result = await public_servers.find({ tag: "public_servers" });
  res.status(200).json(result);
};
// private servers
const createNewServer = async (req, res) => {
  const { servers } = req.body;
  const newServers = servers;
  try {
    for (let z_server of newServers) {
      const { type } = z_server;
      console.log(type);
      // console.log("server hitted", type);
      if (type === "shadowsocks") {
        const { server, tag, server_port, method, password } = z_server;
        const result = await ss.create({
          type,
          server,
          tag,
          server_port,
          method,
          password,
        });
      } else if (type === "ssh") {
        const { server, tag, server_port, user, password } = z_server;
        const result = await ssh.create({
          type,
          server,
          tag,
          server_port,
          user,
          password,
        });
        console.log(result);
      } else if (type === "vmess") {
        const {
          server,
          tag,
          server_port,
          uuid,
          security,
          alter_id,
          transport,
          tls,
        } = z_server;
        if (Object.keys(transport).length !== 0) {
          // console.log("Hee,transport layer found");
          // console.log(
          //   transport.type,
          //   transport.path,
          //   transport.headers,
          //   transport.headers.host
          // );
          const result = await vmess.create({
            type,
            server,
            tag,
            server_port,
            uuid,
            security,
            alter_id,
            tls,
            transport: {
              type: transport.type,
              path: transport.path,
              headers: transport.headers,
            },
          });
          console.log(result);
        } else {
          const result = await vmess.create({
            type,
            server,
            tag,
            server_port,
            uuid,
            security,
            alter_id,
            tls,
          });
          console.log(result);
        }
      }
    }
    res.status(200).json({ success: "true", data: servers });
  } catch (error) {
    res.status(404).json({ success: "false", error: error });
  }
};

const getAllServers = async (req, res) => {
  const SSH = await ssh.find({});
  const SS = await ss.find({});
  const VMESS = await vmess.find({});
  const servers = [...VMESS, ...SSH, ...SS];
  res.status(200).json(servers);
};

const deleteServer = async (req, res) => {
  const { serverId, serverType } = req.body;
  console.log(req.body);
  console.log(serverId, serverType);
  if (!serverId || !serverType) {
    return res
      .status(400)
      .json({ message: "ServerId and ServerType required!" });
  }
  switch (serverType) {
    case "vmess": {
      const result = await vmess.deleteOne({ _id: serverId });
      res.status(200).json(result);
      break;
    }
    case "ssh": {
      const result = await ssh.deleteOne({ _id: serverId });
      res.status(200).json(result);
      break;
    }
    case "shadowsocks": {
      const result = await ss.deleteOne({ _id: serverId });
      res.status(200).json(result);
      break;
    }
    default: {
      res.status(400).json({ error: "Invalid server type." });
      break;
    }
  }

  // const result = await serverType.deleteOne({ _id: serverId });
};

const getRandomServers = async (req, res) => {
  const { isp = "ooredoo" } = req.query;
  const data = await public_random_server.findOne({ tag: "random_servers" });
  try {
    const isp_public_server = data?.public_servers.filter((data) => {
      const isp_list = data?.isp.toLowerCase();
      if (isp_list?.includes(isp.toLowerCase())) {
        return data;
      }
    });
    const isp_list = data?.isp_list;
    // console.log(isp_public_server);
    res
      .status(200)
      .json({
        serverList: isp_public_server[0]["random_server"],
        ispList: isp_list,
      });
  } catch (err) {
    res.status(200).json({ data: "unsupported isp" });
  }
};
module.exports = {
  getAllPublicServers,
  getAllServers,
  deleteServer,
  createNewServer,
  updatePublicServer,
  createPublicServer,
  getRandomServers,
};
