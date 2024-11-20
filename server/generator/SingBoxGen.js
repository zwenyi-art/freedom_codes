const SingBox = {
  sing_box: require("../models/SingBoxConfig.json"),
  resetSingBox: function () {
    if (this.sing_box.outbounds[1].outbounds.length > 0) {
      this.sing_box.outbounds[0].outbounds.splice(
        1,
        this.sing_box.outbounds[0].outbounds.length
      );
      this.sing_box.outbounds[1].outbounds.splice(
        0,
        this.sing_box.outbounds[1].outbounds.length
      );
      this.sing_box.outbounds.splice(6, this.sing_box.outbounds.length);
    }
  },
  setOutbounds: function (data) {
    this.sing_box.outbounds = data;
  },
  setURLTest: function (data) {
    this.sing_box.outbounds[1].outbounds = data;
  },
};
const { v4: uuidv4 } = require("uuid");
const generateId = () => uuidv4();

// const sign_box_config_gen = async (servers) => {
//   console.log("generator");
//   //   await sign_config_clear(servers);
//   for (let data of servers) {
//     if (data.type === "shadowsocks") {
//       console.log(data);
//       const methodList = [
//         "2022-blake3-aes-128-gcm",
//         "2022-blake3-aes-256-gcm",
//         "2022-blake3-chacha20-poly1305",
//         "none",
//         "aes-128-gcm",
//         "aes-192-gcm",
//         "aes-256-gcm",
//         "chacha20-ietf-poly1305",
//         "xchacha20-ietf-poly1305",
//         "aes-128-ctr",
//         "aes-192-ctr",
//         "aes-256-ctr",
//         "aes-128-cfb",
//         "aes-192-cfb",
//         "aes-256-cfb",
//         "rc4-md5",
//         "chacha20-ietf",
//         "xchacha20",
//       ];
//       if (data.tag) {
//         const { tag, type, server, server_port, method, password } = data;
//         sign_box_config.outbounds.push({
//           tag,
//           type,
//           server,
//           server_port,
//           method,
//           password,
//         });
//         sign_box_config.outbounds[0].outbounds.push(tag);
//         sign_box_config.outbounds[1].outbounds.push(tag);
//       } else {
//         const ss = {
//           type: data.type,
//           server: data.server,
//           server_port: data.server_port,
//           method: data.method,
//           password: data.password,
//           tag: String(generateId()),
//         };
//         if (ss.server === "127.0.0.1") {
//           return;
//         }
//         if (!methodList.includes(ss.method)) {
//           return;
//         }
//         sign_box_config.outbounds.push(ss);
//         sign_box_config.outbounds[1].outbounds.push(ss.tag);
//       }
//     } else if (data.type === "ssh") {
//       const { tag, type, server, server_port, user, password } = data;
//       sign_box_config.outbounds.push({
//         tag,
//         type,
//         server,
//         server_port,
//         user,
//         password,
//       });
//       sign_box_config.outbounds[0].outbounds.push(tag);
//       sign_box_config.outbounds[1].outbounds.push(tag);
//       // console.log({ tag, type, server, server_port, user, password });
//     } else if (data.type === "vmess") {
//       const {
//         type,
//         server,
//         tag,
//         server_port,
//         uuid,
//         security,
//         alter_id,
//         transport,
//         tls,
//       } = data;
//       if (transport.type) {
//         sign_box_config.outbounds.push({
//           type,
//           server,
//           tag,
//           server_port,
//           uuid,
//           security,
//           alter_id,
//           transport,
//           tls,
//         });
//       } else {
//         sign_box_config.outbounds.push({
//           type,
//           server,
//           tag,
//           server_port,
//           uuid,
//           security,
//           alter_id,
//         });
//       }

//       sign_box_config.outbounds[0].outbounds.push(tag);
//       sign_box_config.outbounds[1].outbounds.push(tag);
//     }
//   }

//   return sign_box_config;
// };

const sign_box_config_genMod = async (servers) => {
  console.log("generator");
  //   await sign_config_clear(servers);
  SingBox.resetSingBox();
  for (let data of servers) {
    if (data.type === "shadowsocks") {
      const methodList = [
        "2022-blake3-aes-128-gcm",
        "2022-blake3-aes-256-gcm",
        "2022-blake3-chacha20-poly1305",
        "none",
        "aes-128-gcm",
        "aes-192-gcm",
        "aes-256-gcm",
        "chacha20-ietf-poly1305",
        "xchacha20-ietf-poly1305",
        "aes-128-ctr",
        "aes-192-ctr",
        "aes-256-ctr",
        "aes-128-cfb",
        "aes-192-cfb",
        "aes-256-cfb",
        "rc4-md5",
        "chacha20-ietf",
        "xchacha20",
      ];
      if (data.tag) {
        const { tag, type, server, server_port, method, password } = data;
        // SingBox.setOutbounds([
        //   ...SingBox.outbounds,
        //   {
        //     tag,
        //     type,
        //     server,
        //     server_port,
        //     method,
        //     password,
        //   },
        // ]);
        SingBox.setOutbounds([
          ...SingBox.sing_box.outbounds,
          {
            tag,
            type,
            server,
            server_port,
            method,
            password,
          },
        ]);
        SingBox.setURLTest([...SingBox.sing_box.outbounds[1].outbounds, tag]);
      } else {
        const ss = {
          type: data.type,
          server: data.server,
          server_port: data.server_port,
          method: data.method,
          password: data.password,
          tag: String(generateId()),
        };
        if (ss.server === "127.0.0.1") {
          return;
        }
        if (!methodList.includes(ss.method)) {
          return;
        }
        SingBox.setOutbounds([...SingBox.sing_box.outbounds, ss]);
        SingBox.setURLTest([
          ...SingBox.sing_box.outbounds[1].outbounds,
          ss.tag,
        ]);
        // sign_box_config.outbounds.push(ss);
        // sign_box_config.outbounds[1].outbounds.push(ss.tag);
      }
    } else if (data.type === "ssh") {
      console.log("ssh");
      const { tag, type, server, server_port, user, password } = data;
      // sign_box_config.outbounds.push({
      //   tag,
      //   type,
      //   server,
      //   server_port,
      //   user,
      //   password,
      // });
      // sign_box_config.outbounds[0].outbounds.push(tag);
      // sign_box_config.outbounds[1].outbounds.push(tag);
      // console.log({ tag, type, server, server_port, user, password });
      SingBox.setOutbounds([
        ...SingBox.sing_box.outbounds,
        { tag, type, server, server_port, user, password },
      ]);
      SingBox.setURLTest([...SingBox.sing_box.outbounds[1].outbounds, tag]);
    } else if (data.type === "vmess") {
      console.log("vmess");

      const {
        type,
        server,
        tag,
        server_port,
        uuid,
        security,
        alter_id,
        transport,
        tls,
      } = data;

      console.log({
        type,
        server,
        tag,
        server_port,
        uuid,
        security,
        alter_id,
        transport,
        tls,
      });

      if (transport) {
        SingBox.setOutbounds([
          ...SingBox.sing_box.outbounds,
          {
            type,
            server,
            tag,
            server_port,
            uuid,
            security,
            alter_id,
            transport,
            tls,
          },
        ]);

        // sign_box_config.outbounds.push({
        //   type,
        //   server,
        //   tag,
        //   server_port,
        //   uuid,
        //   security,
        //   alter_id,
        //   transport,
        //   tls,
        // });
      } else {
        SingBox.setOutbounds([
          ...SingBox.sing_box.outbounds,
          {
            type,
            server,
            tag,
            server_port,
            uuid,
            security,
            alter_id,
            tls,
          },
        ]);

        // sign_box_config.outbounds.push({
        //   type,
        //   server,
        //   tag,
        //   server_port,
        //   uuid,
        //   security,
        //   alter_id,
        // });
      }

      // SingBox.setURLTest([...SingBox.sing_box.outbounds[0].outbounds, tag]);
      SingBox.setURLTest([...SingBox.sing_box.outbounds[1].outbounds, tag]);
      // sign_box_config.outbounds[0].outbounds.push(tag);
      // sign_box_config.outbounds[1].outbounds.push(tag);
    }
  }
  return SingBox.sing_box;
  //   return sign_box_config;
};

module.exports = { sign_box_config_genMod };
