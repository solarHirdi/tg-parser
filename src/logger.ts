import * as fs from "fs";
import * as path from "path";
import {Message} from "./types/Message";
import {config} from "../config";


export function save(message: Message): void {
  if (!fs.existsSync(config.MESSAGES_PATH)) fs.mkdirSync(config.MESSAGES_PATH);
  const filePath = path.join(config.MESSAGES_PATH, `${message.chatId}.csv`);
  if (!fs.existsSync(filePath)) fs.appendFileSync(filePath, `${config.HEADER_FORMAT}\n`);
  fs.appendFileSync(filePath, `${message.timestamp},"${message.content.replace(/"/g, "'")}"\n`);
}