// deno-lint-ignore-file

namespace Snowflake {
  export const generate = (machine_id: number) =>
    function* (): Generator<string | Error, never, unknown> {
      let seq: bigint = BigInt(0);
      const shiftLeftTime: bigint = BigInt(22);
      const machine: bigint = BigInt(machine_id) << BigInt(12);
      let lastTime: bigint = BigInt(Date.now());
      while (true) {
        try {
          seq++;
          const time = BigInt(Date.now());
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

export default Snowflake;
