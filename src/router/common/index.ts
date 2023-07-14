import { Hono } from "hono";
import { default as key } from "@router/common/key.ts";

const common = new Hono();

common.route("/", key);

export default common;
