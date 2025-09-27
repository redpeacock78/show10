export const Constants = {
  ROOT_PATH: "/",
  BASE_PATH: "/api",
  PING_PATH: "/ping",
  SHORTER_PATH: "/shorter",
  API_VERSION: "v0",
  SECRETS: [
    "POSTGRES_HOST",
    "POSTGRES_PORT",
    "POSTGRES_DB",
    "POSTGRES_USER",
    "POSTGRES_PASSWORD",
    "POSTGRES_SSL",
  ],
} as const satisfies Readonly<Record<string, unknown>>;
