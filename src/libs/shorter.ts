// deno-lint-ignore-file
import { Db, Id, Key, MachineId } from "libs";

/**
 * 短縮URLに関する操作を行う名前空間
 */
export namespace Shorter {
  export type resultObjectType = {
    key: string;
    url: string;
  };
  /**
   * 短縮URLの生成を行う
   * @param url オリジナルのURL
   * @returns {Promise<resultObjectType>} 生成された短縮URLとオリジナルのURL
   */
  export const generater = async (url: string): Promise<resultObjectType> => {
    try {
      const getKey: Db.getKeyType = await Db.getKey(url);
      if (getKey.length === 0) {
        const id: string = await Id.generate(MachineId.generate());
        const key: string = Key.encode62(BigInt([...id].reverse().join("")));
        const setResult: Db.setResultType = await Db.setShorterUrl({
          id: BigInt(id),
          key: key,
          origin_url: url,
        });
        return { key: setResult[0].key, url: url };
      } else {
        const originUrl: Db.getOriginUrlType = await Db.getOriginUrl(
          getKey[0].key
        );
        return { key: getKey[0].key, url: originUrl[0].origin_url };
      }
    } catch {
      throw new Error();
    }
  };
}
