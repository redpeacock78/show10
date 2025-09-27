import { Hono } from "hono";
import { serve } from "serve";
import { Db, Constants } from "libs";
import { api, common } from "router";
import app from "./app.tsx";

const server = new Hono();

await Db.createShorterUrlTable()
  .then(() => {
    server.route(`${Constants.ROOT_PATH}`, api);
    server.route(`${Constants.ROOT_PATH}`, app);
    server.route(`${Constants.ROOT_PATH}`, common);
    serve(server.fetch);
  })
  .catch(() => {
    console.error("Failed to connect to the database.");
  });
