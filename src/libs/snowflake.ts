// deno-lint-ignore-file

/**
 * Snowflakeに関する名前空間
 */
export namespace Snowflake {
  const baseTime: number = Date.UTC(2023, 6, 1, 0, 0, 0, 0);
  /**
   * Snowflakeを使用し一意な数値を生成する(基準時刻は2023/07/01 00:00:00.000 UTC)
   * @param {number} machineId 一意なMachine ID
   * @returns 生成結果
   */
  export const generate = (machineId: number) =>
    function* (): Generator<string | Error, never, unknown> {
      let seq: bigint = BigInt(0);
      const shiftLeftTime: bigint = BigInt(22);
      const machine: bigint = BigInt(machineId) << BigInt(12);
      const startingTime: bigint = BigInt(baseTime);
      let lastTime: bigint = BigInt(Date.now()) - startingTime;
      while (true) {
        try {
          seq++;
          const time = BigInt(Date.now()) - startingTime;
          const shiftedTime = time << shiftLeftTime;
          if (time === lastTime && seq >= BigInt(4096)) throw new Error();
          if (time !== lastTime) seq = BigInt(0);
          const id: bigint = BigInt.asUintN(64, shiftedTime | machine | seq);
          lastTime = time;
          yield id.toString();
        } catch {
          yield new Error();
        }
      }
    };
  /**
   * Snowflakeで生成された一意な値を生成された日付に戻す
   * @param {number} id Snowflakeで生成された一意な値
   * @returns 生成された日付
   */
  export const decode = (id: string): Date => {
    const bitId: string = BigInt(id).toString(2);
    const rm22BitId: string = bitId.slice(0, bitId.length - 22);
    const result: Date = new Date(parseInt(rm22BitId, 2) + baseTime);
    if (Number.isNaN(result.getTime())) throw new Error();
    return result;
  };
}
