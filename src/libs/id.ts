// deno-lint-ignore-file no-namespace
import { Snowflake, Db } from "@libs/index.ts";

export namespace Id {
  export const generate = async (machine_id: number): Promise<string> => {
    const lastId: Db.getLastIdType = await Db.getLastId();
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
