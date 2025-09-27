// deno-lint-ignore-file no-namespace
import { Secrets } from "libs";
import postgres from "postgresjs";

const host = Secrets.POSTGRES_HOST;
const port = (() => {
  try {
    return Number(Secrets.POSTGRES_PORT);
  } catch {
    return 54321;
  }
})();
const database = Secrets.POSTGRES_DB;
const username = Secrets.POSTGRES_USER;
const password = Secrets.POSTGRES_PASSWORD;
const ssl = (() => {
  try {
    return JSON.parse(Secrets.POSTGRES_SSL) as boolean;
  } catch {
    return Secrets.POSTGRES_SSL as
      | "require"
      | "allow"
      | "prefer"
      | "verify-full";
  }
})();

/**
 * データベースの操作に関する名前空間
 */
export namespace Db {
  const sql = postgres({
    host,
    port,
    database,
    username,
    password,
    ssl,
    onnotice: (_i: unknown): void => {
      return;
    },
  });
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
  export type getLastIdType = {
    id: string;
  }[];
  /**
   * DBへの接続確認を行う
   * @returns {Promise<void>}
   */
  export const ping = async (): Promise<void> => {
    await sql`SELECT 1`;
  };
  /**
   * 使用するDBのテーブルを作成する(作成済みの場合は再作成されない)
   * @returns {Promise<void>}
   */
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
  /**
   * DBに生成した短縮URLの情報を書き込む
   * @param {setObjectType} setObject DBに書き込む情報
   * @returns {Promise<setResultType>} 登録された短縮URLの文字列
   */
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
  /**
   * 与えられた短縮URLの文字列から元のURLを検索する
   * @param {string} key 短縮URLの文字列
   * @returns {Promise<getOriginUrlType>} 検索結果
   */
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
  /**
   * 与えられたURLから短縮URLの文字列を検索する
   * @param {string} originUrl URL
   * @returns {Promise<getKeyType>} 検索結果
   */
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
  /**
   * 最後に登録されたIDを検索する
   * @returns {Promise<getLastIdType>} 検索結果
   */
  export const getLastId = async (): Promise<getLastIdType> => {
    return await sql`
      select
        id
      from
        shorter_url
      order by
        id desc
      limit
        1
    `;
  };
  export const close = async (): Promise<void> => {
    await sql.end();
  };
}
