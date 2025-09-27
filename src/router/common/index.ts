import { Hono } from "hono";
import { Constants } from "libs";
import { default as key } from "@router/common/key.ts";

const common = new Hono();

common.route(`${Constants.ROOT_PATH}`, key);

export default common;
