import { Key, Snowflake } from "libs";

/**
 * 与えられた文字列が適切ななKeyかどうかを判別する
 * @param {string} key 与えられた文字列
 * @returns {boolean} 判定結果
 */
export const isKey = (key: string): boolean => {
  try {
    const decodeKey: string = Key.decode62(key);
    Snowflake.decode([...decodeKey].reverse().join(""));
    return true;
  } catch {
    return false;
  }
};
