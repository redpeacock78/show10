// deno-lint-ignore-file

/**
 * 短縮URLに使用するための文字列のエンコード/デコードを行う名前空間
 */
export namespace Key {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  /**
   * 与えられた数値をbase62で文字列に変換
   * @param {bigint} num 変換したい数値
   * @returns {string} 変換結果の文字列
   */
  export const encode62 = (num: bigint): string => {
    let number: bigint = num;
    const base: bigint = BigInt(chars.length);
    let str: string = "";
    while (true) {
      str = `${[...chars][Number(number % base)]}${str}`;
      number = number / base;
      if (number === 0n) break;
    }
    return str;
  };
  /**
   * base62で変換された文字列を元の文字列(数値)に変換
   * @param {string} string 変換したい文字列
   * @returns {string} 変換結果の文字列(数値)
   */
  export const decode62 = (string: string): string => {
    const base: bigint = BigInt(chars.length);
    let num: bigint = 0n;
    for (const char of [...string]) {
      if ([...chars].indexOf(char) === -1) break;
      num = num * base + BigInt([...chars].indexOf(char) as number);
    }
    const result: string = num.toString();
    if (result === "0") throw new Error();
    return result;
  };
}
