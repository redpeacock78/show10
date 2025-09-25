import unienv from "unienv";
import { Constants } from "libs";

type ReadonlyRecord<K extends PropertyKey, T> = Readonly<Record<K, T>>;
type PartialRecord<K extends PropertyKey, T> = Partial<Record<K, T>>;
type ElementOf<T extends readonly unknown[]> = T[number];
type SecretsKeys = ElementOf<typeof Constants.SECRETS>;

const isFullSecrets = (
  obj: PartialRecord<SecretsKeys, string>
): obj is ReadonlyRecord<SecretsKeys, string> =>
  Constants.SECRETS.every((key) => obj[key] !== undefined);

const envs = Constants.SECRETS.reduce(
  (acc, cur) => {
    const env = unienv.get(cur);
    return env.isNg()
      ? { values: acc.values, errors: [...acc.errors, env.error.message] }
      : !env.value
      ? { values: acc.values, errors: [...acc.errors, `${cur} is not set.`] }
      : { values: { ...acc.values, [cur]: env.value }, errors: acc.errors };
  },
  {
    values: {} as PartialRecord<SecretsKeys, string>,
    errors: [] as string[],
  }
);

if (envs.errors.length > 0) throw new Error(envs.errors.join("\n"));
if (!isFullSecrets(envs.values)) throw new Error("Not all secrets are set.");

export const Secrets: ReadonlyRecord<SecretsKeys, string> = Object.freeze(
  envs.values
);
