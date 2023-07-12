// deno-lint-ignore-file no-namespace
import "dotenv";
import postgres from "postgresjs";

const sql = postgres({
  host: Deno.env.get("POSTGRES_HOST"),
  port: 5432,
  database: Deno.env.get("POSTGRES_DB"),
  username: Deno.env.get("POSTGRES_USER"),
  password: Deno.env.get("POSTGRES_PASSWORD"),
});

namespace Db {
  export type setObjectType = {
    id: bigint;
    key: string;
    origin_url: string;
  };
  export type setResultType = {
    key: string;
  }[];
  export type getOriginUrlType = {
    origin_url: string;
  }[];
  export type getKeyType = {
    key: string;
  }[];
  export const createShorterUrlTable = async (): Promise<void> => {
    await sql`
      CREATE TABLE IF NOT EXISTS shorter_url (
        id bigserial primary key,
        key text,
        origin_url text,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `;
  };
  export const setShorterUrl = async ({
    id: id,
    key: key,
    origin_url: originUrl,
  }: setObjectType): Promise<setResultType> => {
    return await sql`
      insert into shorter_url
        (id, key, origin_url)
      values
        (${id}, ${key}, ${originUrl})
      returning key
    `;
  };
  export const getOriginUrl = async (
    key: string
  ): Promise<getOriginUrlType> => {
    return await sql`
      select
        origin_url
      from
        shorter_url
      where
        key = ${key}
    `;
  };
  export const getKey = async (originUrl: string): Promise<getKeyType> => {
    return await sql`
      select
        key
      from
        shorter_url
      where
        origin_url = ${originUrl}
    `;
  };
  export const close = async (): Promise<void> => {
    await sql.end();
  };
}

export default Db;
