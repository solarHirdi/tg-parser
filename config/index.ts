import {defaults} from "./defaults";
import {env} from "./env";

export const config = {
  ...defaults,
  ...env,
}