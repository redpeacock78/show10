export const Constants = {
  SECRETS: [
    "POSTGRES_HOST",
    "POSTGRES_PORT",
    "POSTGRES_DB",
    "POSTGRES_USER",
    "POSTGRES_PASSWORD",
    "POSTGRES_SSL",
  ],
} as const satisfies Record<string, readonly string[]>;
