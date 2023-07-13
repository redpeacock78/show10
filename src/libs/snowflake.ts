// deno-lint-ignore-file

export namespace Snowflake {
  export const generate = (machine_id: number) =>
    function* (): Generator<string | Error, never, unknown> {
      let seq: bigint = BigInt(0);
      const shiftLeftTime: bigint = BigInt(22);
      const machine: bigint = BigInt(machine_id) << BigInt(12);
      const startingTime: bigint = BigInt(Date.UTC(2023, 6, 1, 0, 0, 0, 0));
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
}
