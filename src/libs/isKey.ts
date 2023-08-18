import { Key } from "@libs/key.ts";

/**
 * 与えられた文字列が適切ななKeyかどうかを判別する
 * @param {string} key 与えられた文字列
 * @returns {boolean} 判定結果
 */
export const isKey = (key: string): boolean => {
  if (Key.decode62(key) === "0") return false;
  return true;
};
