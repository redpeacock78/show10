import { Hono } from "hono";
import { Db, isKey } from "libs";

const key = new Hono();

key.get("/:key", async (c): Promise<void | Response> => {
  const key: string = c.req.param("key");
  if (!isKey(key)) return c.status(500);
  try {
    const originUrl: Db.getOriginUrlType = await Db.getOriginUrl(key);
    const url: string = originUrl[0].origin_url;
    if (!url) return c.notFound();
    return c.redirect(url, 301);
  } catch {
    return c.status(500);
  }
});

export default key;
