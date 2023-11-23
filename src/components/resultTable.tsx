/** @jsx jsx */
import { jsx } from "hono-middleware";
import { isUrl } from "libs";
import { Shorter } from "libs";
import { SuccessAlert } from "@components/common/successAlert.tsx";
import { ErrorAlert } from "@components/common/errorAlert.tsx";

export const ResultTable = async (props: { url: string; apiBase: string }) => {
  if (!isUrl(props.url))
    return <ErrorAlert message={"Please enter the exact URL."} />;
  try {
    const json = await Shorter.generater(props.url);

    return (
      <div>
        <SuccessAlert message={"Successfully generated shortened URL."} />
        <div class="flex justify-center">
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Origin URL
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Short URL
                  </th>
                  <th scope="col" class="px-6 py-3" />
                </tr>
              </thead>
              <tbody>
                <tr class="g-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td scope="col" class="px-6 py-3">
                    <a
                      href={props.url}
                      target="_blank"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      id="origin"
                    >
                      {props.url}
                    </a>
                  </td>
                  <td scope="col" class="px-6 py-3">
                    <a
                      href={`${props.apiBase}/${json.key}`}
                      target="_blank"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      id="short"
                    >{`${props.apiBase}/${json.key}`}</a>
                  </td>
                  <td scope="col" class="px-6 py-3">
                    <button
                      class="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
                      id="copy"
                      onclick="copy2Clipboad()"
                    >
                      Copy
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } catch {
    return <ErrorAlert message={"Processing failed. Please try again."} />;
  }
};
