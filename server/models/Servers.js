const mongoose = require("mongoose");

const Public_SSserverSchema = new mongoose.Schema({
  type: { type: String, required: true },
  server: { type: String, required: true },
  server_port: { type: Number, required: true },
  method: { type: String, required: true },
  password: { type: String, required: true },
});

//shadowsocks schema for personal
const SSserverSchema = new mongoose.Schema({
  type: { type: String, required: true },
  server: { type: String, required: true },
  server_port: { type: Number, required: true },
  method: { type: String, required: true },
  password: { type: String, required: true },
  tag: { type: String, required: true },
});

//ssh server schema for personal
const SshServerSchema = new mongoose.Schema({
  type: { type: String, required: true },
  server: { type: String, required: true },
  server_port: { type: Number, required: true },
  user: { type: String, required: true },
  password: { type: String, required: true },
  tag: { type: String, required: true },
});

//vmess server schema for personal
const VmessServerSchema = new mongoose.Schema({
  type: { type: String, required: true },
  tag: { type: String, required: true },
  server: { type: String, required: true },
  server_port: { type: Number, required: true },
  uuid: { type: String, required: true },
  security: { type: String, required: true },
  alter_id: { type: Number, required: true },
  tls: {
    enabled: { type: Boolean },
    insecure: { type: Boolean, default: true },
    server_name: { type: String },
  },
  transport: {
    type: { type: String },
    path: { type: String },
    headers: {
      host: { type: String },
    },
  },
});

//public shadowsocks server schema
const PublicServersSchema = new mongoose.Schema({
  servers: {
    type: [Public_SSserverSchema], // Array of server configurations
    // Default to an empty array
  },
  tag: { type: String },
});

const IspSchema = new mongoose.Schema({
  type: { type: String, required: true },
});

const ServersSchema = new mongoose.Schema({
  type: { type: String, required: true },
  server: { type: String, required: true },
  server_port: { type: Number, required: true },
  method: { type: String, required: true },
  password: { type: String, required: true },
  tag: { type: String },
  is_private: { type: Boolean },
});

const RandomServers = new mongoose.Schema(
  {
    tag: { type: String },
    public_servers: { type: Array },
    private_servers: { type: Array },
    isp_list: { type: Array },
  },
  { timestamps: true }
);

const public_servers = mongoose.model("public", PublicServersSchema);
const myShadowSocks = mongoose.model("shadowsocks", ServersSchema);
const ssh = mongoose.model("ssh_server", SshServerSchema);
const ss = mongoose.model("ss_server", SSserverSchema);
const vmess = mongoose.model("vmess_server", VmessServerSchema);
const public_random_server = mongoose.model(
  "public_random_server",
  RandomServers
);
const Isp_List = mongoose.model("isplist", IspSchema);
module.exports = {
  public_servers,
  ssh,
  ss,
  vmess,
  public_random_server,
  myShadowSocks,
  Isp_List,
};
