// deno-lint-ignore-file no-explicit-any
import { Hono } from "hono";
import { Db, isKey, Constants } from "libs";

const key = new Hono();

key.get(
  `${Constants.ROOT_PATH}:key`,
  async (c: any): Promise<void | Response> => {
    try {
      const key: string = c.req.param("key");
      if (!isKey(key)) return c.text("Invalid Url!", 400);
      return await Db.getOriginUrl(key)
        .then((originUrl) => {
          if (!originUrl.length) return c.notFound();
          const url: string = originUrl[0].origin_url;
          if (!url) return c.notFound();
          return c.redirect(url, 301);
        })
        .catch(() => c.status(500));
    } catch {
      return c.text("Invalid Request!", 400);
    }
  }
);

export default key;
