// deno-lint-ignore-file no-namespace
import { Snowflake, Db } from "@libs/index.ts";

/**
 * DBで使うIDや短縮URLの文字列の変換元として使用する数値の生成を行う名前空間
 */
export namespace Id {
  /**
   * Snowflakeを使用し、DBで使うIDや短縮URLの文字列の変換元として使用する数値を生成する
   * @param {number} machineId 一意なMachine ID
   * @returns {Promise<string>} 生成された数値
   */
  export const generate = async (machineId: number): Promise<string> => {
    const lastId: Db.getLastIdType = await Db.getLastId();
    let id: string;
    while (true) {
      try {
        id = Snowflake.generate(machineId)().next().value as string;
        if (lastId[0].id === id) {
          continue;
        } else if (id.slice(-1) !== "0") {
          break;
        }
      } catch {
        continue;
      }
    }
    return id;
  };
}
