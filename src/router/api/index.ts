import { Hono } from "hono";
import { Constants } from "libs";
import { default as ping } from "@router/api/ping.ts";
import { default as shorter } from "@router/api/shorter.ts";

const api = new Hono().basePath(
  `${Constants.API_PATH}${Constants.ROOT_PATH}${Constants.API_VERSION}`
);

api.route(`${Constants.ROOT_PATH}`, ping);
api.route(`${Constants.ROOT_PATH}`, shorter);

export default api;
