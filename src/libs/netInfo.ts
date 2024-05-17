// deno-lint-ignore-file
import os from "os";

/**
 * ネットワーク関連の情報操作を行う名前空間
 */
export namespace Netinfo {
  /**
   * 指定されたファミリを持つ最初のネットワークインタフェースを検索を行う
   *
   * @param {"IPv4" | "IPv6"} family - 検索するネットワークインターフェースのファミリ
   * @return {os.NetworkInterfaceInfo | undefined} 見つかったネットワークインターフェース
   */
  const findFirstInterface = (
    family: "IPv4" | "IPv6"
  ): os.NetworkInterfaceInfo | undefined => {
    const netInfos: NodeJS.Dict<os.NetworkInterfaceInfo[]> =
      os.networkInterfaces();
    for (const value of Object.values(netInfos)) {
      const addresInfo: os.NetworkInterfaceInfo | undefined = value?.find(
        (info: os.NetworkInterfaceInfo): boolean => info.family === family
      );
      if (addresInfo) return addresInfo;
    }
    return undefined;
  };
  /**
   * IPv4アドレスの取得を行う
   * @returns {string} IPv4アドレス
   */
  export const getIpv4 = (): string =>
    findFirstInterface("IPv4")?.address ?? "192.0.2.0";
  /**
   * MACアドレスの取得を行う
   * @returns {string} MACアドレス
   */
  export const getMAC = (): string =>
    findFirstInterface("IPv4")?.mac ?? "01:00:5e:90:10:FF";
  /**
   * IPv6アドレスの取得を行う
   * @returns {string} IPv6アドレス
   */
  export const getIpv6 = (): string => {
    const ipv6: os.NetworkInterfaceInfo | undefined =
      findFirstInterface("IPv6");
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
