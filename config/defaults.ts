import * as path from "path";

export const defaults = {
  HEADER_FORMAT: 'timestamp,message',
  MESSAGES_PATH: path.join('temp', 'messages'),
  SESSION_PATH: path.join('temp', 'sessions')
}