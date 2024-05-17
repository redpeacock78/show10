// deno-lint-ignore-file
import { Netinfo } from "libs";

/**
 * MachineIDに関する操作を行う名前空間
 */
export namespace MachineId {
  /**
   * IPv4アドレス、IPv6アドレス、MACアドレスから10bitのMachineIDの生成を行う
   * @returns {string} MachineID
   */
  export const generate = (): number => {
    /**
     * 指定した基数と区切り文字に基づいて文字列を整数に変換を行う
     *
     * @param {string} props.value - 変換する文字列
     * @param {string} props.separator - 文字列の分割に使われる区切り文字
     * @param {number} props.beforRadix - 文字列を整数に変換する際に使用する基数
     * @param {number} props.afterRadix - 最終的な整数表現に使用する基数
     * @return {number} 変換後の整数値
     */
    const string2IntNumber = (props: {
      value: string;
      separator: string;
      beforRadix: number;
      afterRadix: number;
    }): number =>
      parseInt(
        props.value
          .split(props.separator)
          .map((i: string): string =>
            parseInt(i, props.beforRadix).toString(props.afterRadix)
          )
          .join(""),
        props.afterRadix
      );

    const ipv6ToNum: number = string2IntNumber({
      value: Netinfo.getIpv6(),
      separator: ":",
      beforRadix: 16,
      afterRadix: 2,
    });
    const ipv4ToNum: number = string2IntNumber({
      value: Netinfo.getIpv4(),
      separator: ".",
      beforRadix: 10,
      afterRadix: 2,
    });
    const mac2num: number = string2IntNumber({
      value: Netinfo.getMAC(),
      separator: ":",
      beforRadix: 16,
      afterRadix: 2,
    });

    return Number(
      (BigInt(ipv6ToNum) * BigInt(ipv4ToNum) + BigInt(mac2num)) & 0x3ffn
    );
  };
}
