/** @jsx jsx */
import { jsx } from "hono-middleware";

export const Footer = () => (
  <footer class="bg-white rounded-lg shadow m-4 dark:bg-gray-800 mt-auto">
    <footer class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2023{" "}
        <a
          href="https://github.com/redpeacock78"
          target="_blank"
          class="hover:underline"
        >
          redpeacock78
        </a>
        . All Rights Reserved.
      </span>
      <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
          <a
            href="https://github.com/redpeacock78/show10/blob/master/LICENSE"
            target="_blank"
            class="hover:underline me-4 md:me-6"
          >
            Licensing
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/kazuki_199778"
            target="_blank"
            class="hover:underline"
          >
            Contact
          </a>
        </li>
      </ul>
    </footer>
  </footer>
);
