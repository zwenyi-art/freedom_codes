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
    config: {
      type: Object,
      required: true, // This will store your entire configuration as a single object
    },
    tag: { type: String },
    servers: { type: Array },
  },
  { timestamps: true }
);

const public_servers = mongoose.model("public", PublicServersSchema);
const ssh = mongoose.model("ssh_server", SshServerSchema);
const ss = mongoose.model("ss_server", SSserverSchema);
const vmess = mongoose.model("vmess_server", VmessServerSchema);
const random_server = mongoose.model("random_server", RandomServers);
module.exports = { public_servers, ssh, ss, vmess, random_server };
