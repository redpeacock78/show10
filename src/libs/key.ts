// deno-lint-ignore-file

const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

namespace Key {
  export const encode62 = (num: bigint): string => {
    let number = num;
    const base = BigInt(chars.length);
    let str: string = "";
    while (true) {
      str = `${[...chars][Number(number % base)]}${str}`;
      number = number / base;
      if (number === 0n) break;
    }
    return str;
  };
  export const decode62 = (string: string): string => {
    const base = BigInt(chars.length);
    let num = 0n;
    for (const char of [...string]) {
      num = num * base + BigInt([...chars].indexOf(char) as number);
    }
    return num.toString();
  };
}

export default Key;
