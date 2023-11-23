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
      beforRadix: 10,
      afterRadix: 2,
    });

    return Number(
      (BigInt(ipv6ToNum) * BigInt(ipv4ToNum) + BigInt(mac2num)) & 0x3ffn
    );
  };
}
