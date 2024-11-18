const express = require("express");
const bodyParser = require("body-parser");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
// Your Telegram Bot Token from BotFather
const TELEGRAM_BOT_TOKEN = "7618094336:AAEYlPOtFf3_XhTFGabSexXgvkuo5gvkrH0";
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;
const ADMIN_CHAT_ID = "5608710234";
const CHANNEL_CHAT_ID = "-1002259039483";

let userChatIds = [];
// Create an Express app
const app = express();
app.use(bodyParser.json()); // Parse incoming JSON requests

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
//sent animation

async function adminChat(chatId) {
  return;
}

//channel
async function sendMessageToChannel(text) {
  try {
    const response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHANNEL_CHAT_ID, // Using the pre-obtained channel chat ID
        text: text,
      }),
    });

    const data = await response.json();
    console.log("Message sent to channel:", data);
    return data;
  } catch (error) {
    console.error("Error sending message:", error);
  }
}

async function getUpdates() {
  try {
    const response = await fetch(`${TELEGRAM_API_URL}/getUpdates`);
    const data = await response.json();

    console.log("Telegram Updates:", data);

    // Extract channel chat ID from updates
    const channelUpdate = data.result.find(
      (update) =>
        update.message &&
        update.message.chat &&
        update.message.chat.type === "channel"
    );

    if (channelUpdate) {
      const channelChatId = channelUpdate.message.chat.id;
      console.log("Channel chat ID:", channelChatId);
      return channelChatId;
    } else {
      console.log("No channel messages found in updates.");
      return null;
    }
  } catch (error) {
    console.error("Error getting updates:", error);
  }
}
// async function sendGif(chatId) {
//   const baby =
//     "https://drive.google.com/file/d/1W-cq0oTUtU10Efa6yC7ZTx3QJXfKkP-1/view?usp=drivesdk";
//   const res = await fetch(`${TELEGRAM_API_URL}/sendAnimation`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       chat_id: chatId,
//       animation: baby,
//     }),
//   });
//   const data = res.json();
//   console.log(data);
// }
// Handle Telegram webhook requests
app.post("/telegram-webhook", async (req, res) => {
  const { message } = req.body;
  // Extract the message from the webhook payload
  if (message) {
    const chatId = message.chat.id;
    if (message.text === "/start") {
      await sendMessage(chatId, "Hello, world!");
    } else if (message.text === "/register") {
      await sendMessage(chatId, "Hello, world!");
      await sendInlineKeyboard(chatId);
    }
  }
  // if (message && (message.text === "/start" || message.text === "/register")) {
  //   const chatId = message.chat.id;
  //   // console.log(req.body);
  //   await sendMessage(chatId, "Hello, world!");
  //   await sendInlineKeyboard(chatId);
  // }
  // if (message && message.text === "/contact") {
  //   const chatId = message.chat.id;
  //   if (!userChatIds.includes(chatId)) {
  //     userChatIds.push(chatId);
  //   }
  //   await sendMessage(
  //     chatId,
  //     "You have contacted the admin. Type your message, and I will forward it."
  //   );
  //   await sendMessage(
  //     ADMIN_CHAT_ID,
  //     `User with chat ID ${chatId} has contacted you.`
  //   );
  // } else {
  //   // If the message is not a command, forward it to the admin
  //   if (userChatIds.includes(message.chat.id)) {
  //     await sendMessage(
  //       ADMIN_CHAT_ID,
  //       `Message from user ${chatId}: ${message.text}`
  //     );
  //   } else if (chatId == ADMIN_CHAT_ID && message.text.startsWith("/reply")) {
  //     // Admin replies with "/reply <userChatId> <message>"
  //     const parts = message.text.split(" ");
  //     const targetUserChatId = parts[1];
  //     const adminReplyMessage = parts.slice(2).join(" ");

  //     // Send the admin's reply back to the user
  //     await sendMessage(targetUserChatId, `Admin: ${adminReplyMessage}`);
  //   }
  // }
  // if (message && message.text === "/contact") {
  //   // Store the user's chat ID if it's not already stored
  //   if (!userChatIds.includes(chatId)) {
  //     userChatIds.push(chatId);
  //   }
  //   await sendMessage(
  //     chatId,
  //     "You have contacted the admin. Type your message, and I will forward it."
  //   );
  //   await sendMessage(
  //     ADMIN_CHAT_ID,
  //     `User with chat ID ${chatId} has contacted you.`
  //   );
  // } else {
  //   // If the message is not a command, forward it to the admin
  //   if (userChatIds.includes(chatId)) {
  //     await sendMessage(
  //       ADMIN_CHAT_ID,
  //       `Message from user ${chatId}: ${messageText}`
  //     );
  //   } else if (chatId == ADMIN_CHAT_ID && messageText.startsWith("/reply")) {
  //     // Admin replies with "/reply <userChatId> <message>"
  //     const parts = messageText.split(" ");
  //     const targetUserChatId = parts[1];
  //     const adminReplyMessage = parts.slice(2).join(" ");

  //     // Send the admin's reply back to the user
  //     await sendMessage(targetUserChatId, `Admin: ${adminReplyMessage}`);
  //   }
  // }
  // Always respond with 200 OK to Telegram
  res.sendStatus(200);
});
// Route to post to the channel
app.get("/postToChannel", async (req, res) => {
  try {
    const message = req.query.message || "Hello from the bot!"; // Get the message from the query string or default text
    await sendMessageToChannel(message);

    res.send("Message posted to the channel successfully!");
  } catch (error) {
    res.status(500).send("An error occurred while posting to the channel.");
  }
});


