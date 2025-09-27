// deno-lint-ignore-file no-explicit-any
import { Hono } from "hono";
import { isUrl, Shorter, Constants } from "libs";

const shorter = new Hono();

shorter.post(
  `${Constants.SHORTER_PATH}`,
  async (c: any): Promise<void | Response> => {
    try {
      const { url } = await c.req.json();
      if (!url) return c.text("Missing Url!", 400);
      if (!isUrl(url)) return c.text("Invalid Url!", 400);
      return await Shorter.generater(url)
        .then((result) => c.json(result))
        .catch(() => c.status(500));
    } catch {
      return c.text("Invalid Request!", 400);
    }
  }
);

export default shorter;
