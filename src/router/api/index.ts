import { Hono } from "hono";
import { default as ping } from "@router/api/ping.ts";
import { default as shorter } from "@router/api/shorter.ts";

const api = new Hono().basePath("/api/v0");

api.route("/", ping);
api.route("/", shorter);

export default api;
