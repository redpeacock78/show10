// deno-lint-ignore-file no-namespace
import { Snowflake, Db } from "@libs/index.ts";

const lastId: Db.getLastIdType = await Db.getLastId();

export namespace Id {
  export const generate = (machine_id: number): string => {
    let id: string;
    while (true) {
      try {
        id = Snowflake.generate(machine_id)().next().value as string;
        if (lastId[0].id === id) {
          continue;
        } else if (id.slice(-1) !== "0") {
          break;
        }
      } catch {
        continue;
      }
    }
    return id;
  };
}
