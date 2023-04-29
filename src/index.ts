import {TelegramClient} from "telegram";
import {StoreSession} from "telegram/sessions";
import input from "input";
import {save} from "./logger";
import {config} from "../config";


(async () => {
  console.log("Loading...");
  const client = new TelegramClient(new StoreSession(config.SESSION_PATH), config.API_ID, config.API_HASH, { connectionRetries: 5 });
  await client.start({
    phoneNumber: async () => await input.text("Please enter your number: "),
    password: async () => await input.text("Please enter your password: "),
    phoneCode: async () => await input.text("Please enter the code you received: "),
    onError: (err) => console.log(err),
  });
  console.log("You should now be connected.");
  client.session.save();
  console.log("Fetching dialogs.");
  const dialogs = await client.getDialogs({});
  const sources = dialogs.filter(({title}) => !!config.sources.find(source => title.includes(source)));
  for (const dialog of sources) {
    console.log(`Getting messages for chat ${dialog.entity.id}.`)
    const result = await client.getMessages(dialog.entity);
    console.log("Saving to file.")
    result.map(({date, message}) => save({timestamp: date, content: message, chatId: dialog.id.toString()}))
  }
  console.log("Done.")
})();