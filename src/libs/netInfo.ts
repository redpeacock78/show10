// deno-lint-ignore-file
import os from "os";

/**
 * ネットワーク関連の情報操作を行う名前空間
 */
export namespace Netinfo {
  /**
   * IPv4アドレスの取得を行う
   * @returns {string} IPv4アドレス
   */
  export const getIpv4 = (): string => {
    const netInfos = os.networkInterfaces();
    const en0 = netInfos["en0"];
    const ipv4: os.NetworkInterfaceInfo | undefined = en0?.find(
      ({ family }): boolean => family === "IPv4"
    );
    return ipv4?.address ?? "192.0.2.0";
  };
  /**
   * MACアドレスの取得を行う
   * @returns {string} MACアドレス
   */
  export const getMAC = (): string => {
    const netInfos = os.networkInterfaces();
    const en0 = netInfos["en0"];
    const ipv4: os.NetworkInterfaceInfo | undefined = en0?.find(
      ({ family }): boolean => family === "IPv4"
    );
    return ipv4?.mac ?? "01:00:5e:90:10:FF";
  };
  /**
   * IPv6アドレスの取得を行う
   * @returns {string} IPv6アドレス
   */
  export const getIpv6 = (): string => {
    const netInfos = os.networkInterfaces();
    const en0 = netInfos["en0"];
    const ipv6: os.NetworkInterfaceInfo | undefined = en0?.find(
      ({ family }): boolean => family === "IPv6"
    );
    if (!ipv6?.address) return "2001:0db8:0000:0000:0000:0000:0000:0001";
    const ipv6Parts: string[] = ipv6.address.split(":");
    const ipv6Length: number = ipv6Parts.filter(Boolean).length;
    if (ipv6Length === 8) return ipv6.address;
    return ipv6Parts
      .map((i: string): string => {
        if (i === "") return "0000:".repeat(8 - ipv6Length).slice(0, -1);
        if (i.length === 4) return i;
        return `${"0".repeat(4 - i.length)}${i}`;
      })
      .join(":");
  };
}
