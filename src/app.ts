import { Hono } from "hono";
import { serve } from "serve";
import { Db } from "libs";
import { api, common } from "router";
import app from "./app.tsx";

const server = new Hono();

await Db.createShorterUrlTable();

server.route("/", api);
server.route("/", app);
server.route("/", common);

serve(server.fetch);
