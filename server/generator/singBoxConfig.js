// import { v4 as uuidv4 } from "uuid";
const { v4: uuidv4 } = require("uuid");
const generateId = () => uuidv4();
class SingBoxConfigure {
  constructor() {
    this.log = {
      disabled: false,
      level: "info",
      timestamp: true,
    };
    this.dns = {
      servers: [
        {
          tag: "dns_googletcp",
          address: "tcp://8.8.8.8",
          strategy: "ipv4_only",
          detour: "🚀 Node selection",
        },
        {
          tag: "dns_google",
          address: "https://8.8.8.8/dns-query",
          detour: "DIRECT",
        },
        {
          tag: "google_dnstls",
          address: "tls://dns.google",
          address_resolver: "dns_resolver",
          detour: "DIRECT",
        },
        {
          tag: "dns_googleudp",
          address: "udp://8.8.4.4",
          detour: "DIRECT",
        },
        {
          tag: "dns_googlehttp3",
          address: "h3://8.8.8.8/dns-query",
          detour: "DIRECT",
        },
        {
          tag: "dns_direct",
          address: "h3://dns.alidns.com/dns-query",
          address_resolver: "dns_resolver",
          detour: "DIRECT",
        },
        {
          tag: "dns_googlesecondary",
          address: "8.8.4.4",
          detour: "DIRECT",
        },
        {
          tag: "dns_resolver",
          address: "8.8.8.8",
          detour: "DIRECT",
        },
        {
          tag: "dns_fakeip",
          address: "fakeip",
        },
        {
          tag: "block",
          address: "rcode://success",
        },
      ],
      rules: [
        {
          outbound: ["any"],
          server: "dns_resolver",
          disable_cache: true,
        },
        {
          rule_set: "geosite-category-ads-all",
          server: "block",
          disable_cache: true,
        },
        {
          rule_set: "geosite-geolocation-!cn",
          query_type: ["A", "AAAA"],
          server: "dns_fakeip",
        },
      ],
      final: "dns_direct",
      independent_cache: true,
      fakeip: {
        enabled: true,
        inet4_range: "198.18.0.0/15",
        inet6_range: "fc00::/18",
      },
    };
    this.ntp = {
      enabled: true,
      server: "time.apple.com",
      server_port: 123,
      interval: "30m",
      detour: "DIRECT",
    };
    this.inbounds = [
      {
        type: "mixed",
        listen: "0.0.0.0",
        listen_port: 2080,
        tcp_fast_open: false,
        udp_fragment: true,
        udp_disable_domain_unmapping: true,
        sniff: true,
      },
      {
        type: "tun",
        mtu: 9000,
        address: ["172.19.0.1/30", "fdfe:dcba:9876::1/126"],
        route_address: ["0.0.0.0/1", "128.0.0.0/1", "::/1", "8000::/1"],
        route_exclude_address: ["192.168.0.0/16", "fc00::/7"],
        auto_route: true,
        strict_route: true,
        endpoint_independent_nat: true,
        stack: "mixed",
        sniff: true,
        sniff_override_destination: true,
        domain_strategy: "prefer_ipv4",
      },
    ];
    this.outbounds = [
      {
        type: "direct",
        tag: "DIRECT",
      },
      {
        type: "block",
        tag: "REJECT",
      },
      {
        type: "dns",
        tag: "dns-out",
      },
      {
        type: "selector",
        tag: "🚀 Node selection",
        outbounds: [
          "♻️ Automatic selection",
          "☢️ Backup Runner",
          "🖥 Load balancing",
        ],
      },
      {
        type: "urltest",
        tag: "♻️ Automatic selection",
        outbounds: ["☢️ Backup Runner", "🖥 Load balancing"],
        url: "http://www.gstatic.com/generate_204",
        interval: "3m",
        tolerance: 50,
      },
      {
        type: "selector",
        tag: "📱 Facebook",
        outbounds: ["🖥 Load balancing", "☢️ Backup Runner"],
      },
      {
        type: "urltest",
        tag: "☢️ Backup Runner",
        outbounds: [],
        url: "http://www.gstatic.com/generate_204",
        interval: "2m30s",
        tolerance: 50,
      },
      {
        type: "urltest",
        tag: "🖥 Load balancing",
        outbounds: ["☢️ Backup Runner"],
        url: "http://www.gstatic.com/generate_204",
        interval: "10m",
        tolerance: 50,
      },
      {
        type: "selector",
        tag: "🛑 Global interception",
        outbounds: ["REJECT", "DIRECT"],
      },
    ];
    this.route = {
      geoip: {
        download_url:
          "https://codeberg.org/axisghost/newGeoDB/raw/branch/main/geoip.db",
        download_detour: "🚀 Node selection",
      },
      geosite: {
        download_url:
          "https://codeberg.org/axisghost/newGeoDB/raw/branch/main/geosite.db",
        download_detour: "🚀 Node selection",
      },
      rules: [
        {
          clash_mode: "Global",
          outbound: "🚀 Node selection",
        },
        {
          clash_mode: "Direct",
          outbound: "DIRECT",
        },
        {
          protocol: "dns",
          outbound: "dns-out",
        },
        {
          network: "udp",
          port: 443,
          outbound: "REJECT",
        },
        {
          rule_set: "geosite-category-ads-all",
          outbound: "🛑 Global interception",
        },
        {
          rule_set: "geoip-cn",
          outbound: "DIRECT",
        },
        {
          rule_set: "geosite-cn",
          outbound: "DIRECT",
        },
        {
          ip_is_private: true,
          outbound: "DIRECT",
        },
        {
          rule_set: "geosite-geolocation-!cn",
          outbound: "🚀 Node selection",
        },
        {
          domain_suffix: [
            ".facebook.com",
            "*.facebook.com",
            ".whatsapp.net",
            ".xx.fbcdn.net",
          ],
          domain: [
            "facebook.com",
            "*.facebook.com",
            "fb.com",
            "*.fb.com",
            "fbcdn.net",
            "*.fbcdn.net",
            "instagram.com",
            "*.instagram.com",
            "cdninstagram.com",
            "*.cdninstagram.com",
            "whatsapp.com",
            "*.whatsapp.com",
            "messenger.com",
            "*.messenger.com",
            "oculus.com",
            "*.oculus.com",
            "workplace.com",
            "*.workplace.com",
          ],
          outbound: "📱 Facebook",
        },
        {
          domain_suffix: [".google.com", ".youtube.com"],
          domain: [
            "chatgpt.com",
            "openai.com",
            "dns.google",
            "*.openai.com",
            "chat.openai.com",
            "whatismyipaddress.com",
            "google.com",
            "*.google.com",
            "gstatic.com",
            "*.gstatic.com",
            "googleapis.com",
            "*.googleapis.com",
            "googlesyndication.com",
            "*.googlesyndication.com",
            "googleusercontent.com",
            "*.googleusercontent.com",
            "youtube.com",
            "*.youtube.com",
            "ytimg.com",
            "*.ytimg.com",
            "youtube-nocookie.com",
            "*.youtube-nocookie.com",
          ],
          outbound: "DIRECT",
        },
      ],
      rule_set: [
        {
          type: "remote",
          tag: "geoip-cn",
          format: "binary",
          url: "https://codeberg.org/axisghost/newGeoDB/raw/branch/main/geoip-cn.srs",
          download_detour: "DIRECT",
        },
        {
          type: "remote",
          tag: "geosite-cn",
          format: "binary",
          url: "https://codeberg.org/axisghost/newGeoDB/raw/branch/main/geosite-cn.srs",
          download_detour: "DIRECT",
        },
        {
          type: "remote",
          tag: "geosite-geolocation-!cn",
          format: "binary",
          url: "https://codeberg.org/axisghost/newGeoDB/raw/branch/main/geolocation-%21cn.srs",
          download_detour: "DIRECT",
        },
        {
          type: "remote",
          tag: "geosite-category-ads-all",
          format: "binary",
          url: "https://codeberg.org/axisghost/newGeoDB/raw/branch/main/geosite-category-ads-all.srs",
          download_detour: "DIRECT",
        },
      ],
      final: "🚀 Node selection",
      auto_detect_interface: true,
    };
    this.experimental = {
      cache_file: {
        enabled: true,
      },
    };
    this.supportedMethods = {
      shadowsocks: {
        method: [
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
        ],
      },
      vmess: {
        alter_id: [0, 1],
        security: [
          "auto",
          "none",
          "zero",
          "aes-128-gcm",
          "chacha20-poly1305",
          "aes-128-ctr",
        ],
      },
      trojan: {},
      vless: {},
      ssh: {},
      // Add more protocols as needed
    };
  }
  // Supported server methods for Shadowsocks
  serverAnalyzer(data) {
    if (this.supportedMethods.hasOwnProperty(data?.type)) {
      if (this.supportedMethods[data.type].hasOwnProperty("method")) {
        if (this.supportedMethods[data.type]["method"].includes(data.method)) {
          return true;
        }
      } else if (this.supportedMethods[data.type].hasOwnProperty("security")) {
        if (
          this.supportedMethods[data.type]["security"].includes(data.security)
        ) {
          return true;
        }
      } else {
        return true;
      }
    }
    return false;
  }

  // format configure to become clean data
  serverConfigFormatter(data) {
    return;
  }
  generatehelp() {
    return `getOutBound,addOutBound, exportConfig`;
  }
  getOutBound(tag) {
    return this.outbounds.find((data) => data.tag === tag);
  }
  async getServers() {
    const result = this.outbounds.filter(
      (data) =>
        data.type !== "selector" &&
        data.type !== "urltest" &&
        data.type !== "block" &&
        data.type !== "direct" &&
        data.type !== "dns"
    );
    return result;
  }
  async addOutBound(OutboundTag, objectArray) {
    try {
      for (let z = 0; z < objectArray.length; z++) {
        let data =
          "_doc" in objectArray[z]
            ? objectArray[z]["_doc"]["data"]
            : objectArray[z];
        if (this.serverAnalyzer(data)) {
          const {
            tag,
            _id,
            isp = "default_isp",
            date = "default_date",
            __v = "default_v",
            ...newData
          } = data;
          const modifiedData = { tag: generateId(), ...newData };
          this.outbounds
            .find((data) => data.tag === OutboundTag)
            .outbounds.push(modifiedData.tag);
          OutboundTag === "🖥 Load balancing" &&
            this.outbounds
              .find((data) => data.tag === "📱 Facebook")
              .outbounds.push(modifiedData.tag);
          this.outbounds.push(modifiedData);
        }
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  /**
   * Log any action performed on the configuration.
   * @param {string} action - Action description.
   */
  logAction(action) {
    console.log(`[ConfigLog] ${new Date().toISOString()} - ${action}`);
  }
  async getConfig() {
    const { supportedMethods, ...config } = this;
    // return JSON.stringify(config, null, 2);
    return config;
  }
}

module.exports = SingBoxConfigure;
// const load_balancing = singBox.getOutBound("🖥 Load balancing");
// const backup_runner = singBox.getOutBound("☢️ Backup Runner");
// const facebook = singBox.getOutBound("📱 Facebook");
// singBox.getServers();
// console.log(load_balancing);
// console.log(backup_runner);
// console.log(facebook);
// console.log(singBox.getConfig());
