// deno-lint-ignore-file no-explicit-any
/** @jsx jsx */
import { Hono } from "hono";
import { jsx } from "hono-middleware";
import { Suspense, renderToReadableStream } from "hono-streaming";
import { Header } from "@components/header.tsx";
import { Footer } from "@components/footer.tsx";
import { Form } from "@components/form.tsx";
import { ClipBoard } from "@components/clipboard.tsx";
import { ResultTable } from "@components/resultTable.tsx";
import { Loader } from "@components/common/loader.tsx";
import { ErrorAlert } from "@components/common/errorAlert.tsx";

const Component = (props: { url: string; apiBase: string }) => (
  <div class="flex flex-col h-screen">
    <Header />
    <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
      <Form />
      {props.url === "" && (
        <Suspense fallback={<Loader />}>
          <ErrorAlert message={"URL is not entered. Please try again."} />
        </Suspense>
      )}
      {props.url && (
        <Suspense fallback={<Loader />}>
          <ResultTable url={props.url} apiBase={props.apiBase} />
        </Suspense>
      )}
    </div>
    <Footer />
    <ClipBoard />
  </div>
);

const app = new Hono();

app.get("/", (c: any) => {
  const url: string = c.req.query("url");
  const host: string = c.req.header("x-forwarded-host") ?? c.req.header("host");
  const protocol: string = host.startsWith("localhost") ? "http" : "https";
  const apiBase = `${protocol}://${host}`;

  const stream: ReadableStream<Uint8Array> = renderToReadableStream(
    <html>
      <head>
        <title>show10</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="bg-white dark:bg-gray-900">
        <Component url={url} apiBase={apiBase} />
      </body>
    </html>
  );

  return c.body(stream, {
    headers: {
      "Content-Type": "text/html; charset=UTF-8",
      "Transfer-Encoding": "chunked",
    },
  });
});

export default app;
