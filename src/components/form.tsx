/** @jsx jsx */
import { jsx } from "hono-middleware";

export const Form = () => (
  <div class="flex justify-center">
    <form class="w-full max-w-sm">
      <div class="flex items-center border-b border-teal-500 py-2">
        <input
          class="appearance-none bg-transparent border-none w-full text-gray-700 dark:text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
          name="url"
          type="text"
          placeholder="https://example.com"
        />
        <button
          class="flex-shrink-0 bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold py-1 px-2 rounded"
          type="submit"
        >
          Short!
        </button>
      </div>
    </form>
  </div>
);
