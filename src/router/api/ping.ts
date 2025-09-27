// deno-lint-ignore-file no-explicit-any
import { Hono } from "hono";
import { Db, Constants } from "libs";

const ping = new Hono();

ping.get(
  `${Constants.PING_PATH}`,
  async (c: any): Promise<Response> =>
    await Db.ping()
      .then(() => c.text("OK!"))
      .catch(() => c.text("DB Connection Error!", 500))
);

export default ping;
