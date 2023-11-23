// deno-lint-ignore-file no-explicit-any
import { Hono } from "hono";
import { isUrl, Shorter } from "libs";

const shorter = new Hono();

shorter.post("/shorter", async (c: any): Promise<void | Response> => {
  const { url } = await c.req.json();
  if (!url) return c.text("Missing Url!", 400);
  if (!isUrl(url)) return c.text("Invalid Url!", 400);
  try {
    const result = await Shorter.generater(url);
    return c.json(result);
  } catch {
    return c.status(500);
  }
});

export default shorter;
