const {
  ssh,
  ss,
  vmess,
  public_servers,
  random_server,
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
  const { type } = req.body;
  console.log("server hitted", type);
  try {
    if (type === "shadowsocks") {
      const { server, tag, server_port, method, password } = req.body;
      await ss.create({
        type,
        server,
        tag,
        server_port,
        method,
        password,
      });
      console.log(req.body);
    } else if (type === "ssh") {
      const { server, tag, server_port, user, password } = req.body;
      console.log(server, server_port);

      await ssh.create({
        type,
        server,
        tag,
        server_port,
        user,
        password,
      });
      // res.setHeader("Content-Type", "text/event-stream");
      // res.setHeader("Cache-Control", "no-cache");
      // res.setHeader("Connection", "keep-alive");
    } else if (type === "vmess") {
      console.log("vmess is inserting");
      const {
        server,
        tag,
        server_port,
        uuid,
        security,
        alter_id,
        transport,
        tls,
      } = req.body;

      if (Object.keys(transport).length !== 0) {
        // console.log("Hee,transport layer found");
        // console.log(
        //   transport.type,
        //   transport.path,
        //   transport.headers,
        //   transport.headers.host
        // );
        const data = await vmess.create({
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
        res.status(200).json({ success: "true", data });
      } else {
        console.log("data is", req.body);
        const data = await vmess.create({
          type,
          server,
          tag,
          server_port,
          uuid,
          security,
          alter_id,
          tls,
        });
        res.status(200).json({ success: "true", data });
      }
    }
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
    case "ss": {
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
  const randomServer = await random_server
    .findOne({ tag: "random_servers" })
    .exec();
  const serverList = randomServer?.servers?.map((data) => {
    return data.server;
  });
  res.status(200).json({ serverList });
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
