// deno-lint-ignore-file

namespace Snowflake {
  export const generate = (machine_id: number) =>
    function* (): Generator<string | Error, never, unknown> {
      let seq = BigInt(0);
      const shiftLeftTime = BigInt(22);
      const machine = BigInt(machine_id) << BigInt(12);
      let lastTime = BigInt(Date.now());
      while (true) {
        try {
          seq++;
          const time = BigInt(Date.now());
          const shiftedTime = time << shiftLeftTime;
          if (time === lastTime && seq >= BigInt(4096)) throw new Error();
          if (time !== lastTime) seq = BigInt(0);
          const id = BigInt.asUintN(64, shiftedTime | machine | seq);
          lastTime = time;
          yield id.toString();
        } catch {
          yield new Error();
        }
      }
    };
}

export default Snowflake;
