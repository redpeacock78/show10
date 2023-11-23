/** @jsx jsx */
import { jsx } from "hono-middleware";

export const ErrorAlert = (props: { message: string }) => (
  <div
    class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
    role="alert"
  >
    <span class="font-medium">Error:</span> {props.message}
  </div>
);
