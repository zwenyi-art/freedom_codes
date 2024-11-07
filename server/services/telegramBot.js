const TELEGRAM_BOT_TOKEN = "7618094336:AAH25-hk3B9U_s6AY32fpynw_g5IyyKUk-0";
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

const sayHello = async (req, res) => {
  const { message } = req.body;
  console.log(req.body);
  res.sendStatus(200);
};
