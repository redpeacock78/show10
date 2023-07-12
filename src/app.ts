import { Hono } from "hono";
import { serve } from "serve";
import { Snowflake, Key, Db } from "@libs/index.ts";

const app = new Hono();

await Db.createShorterUrlTable();

app.get("/", (c): Response => c.text("OK!"));
app.post("/links", async (c): Promise<void | Response> => {
  const { url } = await c.req.json<{ url: string }>();
  if (!url) return c.text("Missing Url!", 400);
  try {
    const getKey: Db.getKeyType = await Db.getKey(url);
    if (getKey.length === 0) {
      let id: string;
      while (true) {
        id = Snowflake.generate(0)().next().value as string;
        if (id.slice(-1) !== "0") break;
      }
      const key: string = Key.encode62(
        BigInt([...(id as string)].reverse().join(""))
      );
      const setResult: Db.setResultType = await Db.setShorterUrl({
        id: BigInt(id),
        key: key,
        origin_url: url,
      });
      return c.json({ key: setResult[0].key, url: url });
    } else {
      const originUrl: Db.getOriginUrlType = await Db.getOriginUrl(
        getKey[0].key
      );
      return c.json({ key: getKey[0].key, url: originUrl[0].origin_url });
    }
  } catch {
    return c.status(500);
  }
});
app.get("/:key", async (c): Promise<void | Response> => {
  const key: string = c.req.param("key");
  try {
    const originUrl: Db.getOriginUrlType = await Db.getOriginUrl(key);
    const url: string = originUrl[0].origin_url;
    if (!url) return c.notFound();
    return c.redirect(url, 301);
  } catch {
    return c.status(500);
  }
});

serve(app.fetch);
