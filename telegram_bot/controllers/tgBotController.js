const { v4: uuidv4 } = require("uuid");
const uuId = () => uuidv4();
const axios = require("axios");

// const bcrypt = require("bcrypt");
const { couponGen } = require("../generator/couponCodeGen");
const { updateCoupon } = require("./coupnController");
const { handleRegister } = require("./registerController");
const { forgotPwd } = require("./forgotPasswordController");
const {
  getAllServersStatus,
  serverStatusCheck,
} = require("../controllers/serversStatusController");
const Coupon = require("../models/Coupon");
const TELEGRAM_API_URL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

// Function to send a message to a specific chat
async function sendMessage(chatId, text) {
  await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: "Markdown",
    }),
  });
}

//channel
async function sendMessageToChannel(text) {
  // const CHANNEL_CHAT_ID = "-1002521746967";
  try {
    const response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.CHANNEL_CHAT_ID, // Using the pre-obtained channel chat ID
        text: text,
        parse_mode: "MarkdownV2",
      }),
    });

    const data = await response.json();
    console.log("Message sent to channel:", data);
    return data;
  } catch (error) {
    console.error("Error sending message:", error);
  }
}

async function sendInlineKeyboard(chatId) {
  const message = "Choose an option:";
  const inlineKeyboard = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Click Me", // Button text
            callback_data: "button_clicked", // Data sent when the button is clicked
          },
        ],
      ],
    },
  };

  const res = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId, // Required: Chat ID of the user
      text: message, // Message text
      reply_markup: inlineKeyboard.reply_markup, // InlineKeyboard markup
    }),
  });

  const data = await res.json();
  console.log(data);
}
//controllers

function formatDateTime() {
  const now = new Date();

  // Get day with suffix
  const day = now.getDate();
  const daySuffix = getDaySuffix(day);

  // Get month name
  const month = now.toLocaleString("en-US", { month: "long" });

  // Get year
  const year = now.getFullYear();

  // Get time in 12-hour format
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert 0 to 12 for midnight

  return `${day}${daySuffix} ${month} ${year}, ${hours}:${minutes} ${ampm}`;
}

function getFormattedDateTime() {
  const now = new Date();

  // Extract date parts
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = now.getFullYear();

  // Extract time parts
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}

// Helper function to get the correct day suffix (st, nd, rd, th)
function getDaySuffix(day) {
  if (day >= 11 && day <= 13) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

const editMessage = async (req, res) => {
  let messageId = process.env.REAL_TIME_MSG_ID || "";
  const CHANNEL_ID = process.env.CHANNEL_ID;
  const todayDate = getFormattedDateTime();
  // To store the message ID
  const apiServerStatus = await serverStatusCheck();

  const serverStatusData = await getAllServersStatus();

  const serverStatusMessage = `🚨 *REAL-TIME SERVERS STATUS*  
=========================  
📊 *Last Updated:* \`${todayDate}\`  

🍒 *API SERVER 1*  
⚙️ *Status:* ${apiServerStatus?.status === "ok" ? "Online ✅" : "Offline ❌"}

${serverStatusData
  .map((data) => {
    return `⚡️ *${data.isp}*  
✅ *Live:* ${data.server_count}/${data.total} (${data.percentage}%)  
`;
  })
  .join("\n")}
=========================`;

  try {
    if (!messageId) {
      const response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHANNEL_ID,
          text: serverStatusMessage,
          parse_mode: "Markdown",
        }),
      });
      const data = await response.json();
      messageId = data.result.message_id;
      console.log("Message ID:", messageId);
      res.send(data);
    } else {
      const response = await fetch(`${TELEGRAM_API_URL}/editMessageText`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHANNEL_ID,
          message_id: messageId,
          text: serverStatusMessage,
          parse_mode: "Markdown",
        }),
      });
      const data = await response.json();
      // console.log("Message edited:", data);
      res.send(data);
    }
  } catch (error) {
    console.log(error);
  }
};

const postToChannel = async (req, res) => {
  try {
    const todayDate = formatDateTime();
    const coupon = await updateCoupon();
    // const message = `📅 ${todayDate} *bold text*\n\n🌹🌹🌹\n\n🎟️ ကူပွန်ကုဒ်: ||${coupon}|| \n\n🔗 [အသေးစိတ်ကြည့်ရန်](http://www.netflow4mm.com/)  \n\n💙 စိတ်အားတင်းတင်းထားပါ—လင်းလက်သောနေ့တွေကိုယ်တိုင်ရောက်လာမယ်။ သင်တစ်ဦးတည်းမဟုတ်ပါ။\n\n━━━━━━━━━━━━━━━\n\n🎟️ Coupon Code: ||${coupon}||\n\n🔗 [View Details](http://www.google.com/) \n\n💙 Stay strong—better days will come. You are not alone. `;
    const message = "hello";
    await sendMessageToChannel(message);
    // console.log(message);
    res.send("Message posted to the channel successfully!");
  } catch (error) {
    console.log(error);

    // res.status(500).send("An error occurred while posting to the channel.");
  }
};

const generateRandomPassword = () => {
  return uuidv4().slice(0, 8); // Generate an 8-character random password
};

const welcome_message = async (chatId) => {
  const msg = `🚀 *Hey there!*  
You’ve just discovered me, your go-to assistant for managing your [NetFlow4MM](https://www.netflow4mm.com) account. Let’s get things rolling! 🤖  
  
  🎈 /register - *Create a new account* for NetFlow4MM  
  🔐 /forgot - *Reset your password* if you’ve forgotten it.  
  `;
  await sendMessage(chatId, msg);
};

const register_message = async (chatId, msg_data) => {
  console.log("tgbot", msg_data);
  const msg = `
*ID :*
👉  \`${msg_data.userId}\`
 --------------------------------
*PASSWORD :*
👉  \`sufhhchjhhhdhfffg\`
      
    Please keep your credentials secure! 🔒`;
  await sendMessage(chatId, msg);
};

const reset_password = async (chatId, msg_data) => {
  const msg = `
*ID :*
👉  \`${msg_data.userId}\`
--------------------------------
*PASSWORD :*
👉  \`${msg_data.password}\`
    
Please keep your credentials secure! 🔒`;
  await sendMessage(chatId, msg);
};

const exist_user_message = async (chatId) => {
  const msg = `✅ *You are already registered!*  

If you need a new password or have forgotten yours, please use the command:  

🔹 */forgot* – Get a new password  

Let me know how I can assist you! 🤖`;
  await sendMessage(chatId, msg);
};

const not_exist_user_message = async (chatId) => {
  const msg = `⚠️ *You are not registered!*  

To create an account, please use the command:  

🔹 */register* – Register a new account  

Let me know if you need any help! 🤖`;
  await sendMessage(chatId, msg);
};

//tg_webhook
const botStarter = async (req, res) => {
  const { message } = req.body;
  const todayDate = formatDateTime();
  const coupon = await updateCoupon();
  // Extract the message from the webhook payload
  if (message) {
    const chatId = message.chat.id;
    console.log(chatId);
    if (message.text === "/start") {
      // await sendMessage(chatId, "Hello, world!");
      await welcome_message(chatId);
    } else if (message.text === "/register") {
      const result = await handleRegister(chatId);
      // console.log(result);
      // await sendMessage(chatId, result);
      // await sendInlineKeyboard(chatId);
      if (result === 1) {
        await exist_user_message(chatId);
      } else {
        await register_message(chatId, result);
      }
    } else if (message.text === "/forgot") {
      const result = await forgotPwd(chatId);
      if (result === 0) {
        await not_exist_user_message(chatId);
      } else {
        await reset_password(chatId, result);
      }
    }
  }
  res.sendStatus(200);
};

module.exports = { botStarter, postToChannel, editMessage };
