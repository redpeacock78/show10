import { Hono } from "hono";
import { serve } from "serve";
import { Db } from "libs";
import { api, common } from "router";

const app = new Hono();

await Db.createShorterUrlTable();

app.route("/", api);
app.route("/", common);

serve(app.fetch);
