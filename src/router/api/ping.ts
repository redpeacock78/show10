// deno-lint-ignore-file no-explicit-any
import { Hono } from "hono";

const ping = new Hono();

ping.get("/ping", (c: any): Response => c.text("OK!"));

export default ping;
