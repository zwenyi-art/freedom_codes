const { v4: uuidv4 } = require("uuid");
const uuId = () => uuidv4();

const bcrypt = require("bcrypt");
const { couponGen } = require("../generator/couponCodeGen");
const { updateCoupon } = require("./coupnController");
const { handleRegister } = require("./registerController");
const { forgotPwd } = require("./forgotPasswordController");
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
    }),
  });
}

//channel
async function sendMessageToChannel(text) {
  const CHANNEL_CHAT_ID = "-1002259039483";
  try {
    const response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHANNEL_CHAT_ID, // Using the pre-obtained channel chat ID
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
const postToChannel = async (req, res) => {
  try {
    const coupon = await updateCoupon();
    const message = ` \*13 ရက် 11လ 2024ခုနှစ်*\n\nကူပွန်ကုဒ် : ||${coupon}||\n\n[website](http://www.google.com/)\n\n**>ကံကောင်းပါစေ၊ ချစ်သူခင်သူတွေနဲ့ပျော်ရွှင်စွာတသက်လုံးအတူနေနိုင်ပါစေ။`;
    await sendMessageToChannel(message);
    console.log(message);
    res.send("Message posted to the channel successfully!");
  } catch (error) {
    res.status(500).send("An error occurred while posting to the channel.");
  }
};

const generateRandomPassword = () => {
  return uuidv4().slice(0, 8); // Generate an 8-character random password
};

//tg_webhook
const botStarter = async (req, res) => {
  const { message } = req.body;
  // Extract the message from the webhook payload
  if (message) {
    const chatId = message.chat.id;
    if (message.text === "/start") {
      await sendMessage(chatId, "Hello, world!");
    } else if (message.text === "/register") {
      const result = await handleRegister(chatId);
      console.log(result);
      await sendMessage(chatId, result);
      // await sendInlineKeyboard(chatId);
    } else if (message.text === "/forgot") {
      const result = await forgotPwd(chatId);
      await sendMessage(chatId, result);
    }
  }
  res.sendStatus(200);
};

module.exports = { botStarter, postToChannel };
