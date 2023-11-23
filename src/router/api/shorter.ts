// deno-lint-ignore-file no-explicit-any
import { Hono } from "hono";
import { Db, Id, Key, isUrl, MachineId } from "libs";

const shorter = new Hono();

shorter.post("/shorter", async (c: any): Promise<void | Response> => {
  const { url } = await c.req.json();
  if (!url) return c.text("Missing Url!", 400);
  if (!isUrl(url)) return c.text("Invalid Url!", 400);
  try {
    const getKey: Db.getKeyType = await Db.getKey(url);
    if (getKey.length === 0) {
      const id: string = await Id.generate(MachineId.generate());
      const key: string = Key.encode62(BigInt([...id].reverse().join("")));
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

export default shorter;
