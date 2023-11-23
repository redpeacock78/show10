/** @jsx jsx */
import { jsx } from "hono-middleware";

export const ClipBoard = () => {
  const inner = {
    __html: `
function copy2Clipboad() {
  const btn = document.getElementById('copy');
  const shrt = document.getElementById('short');
  const btnTxt = btn.innerHTML;
  navigator.clipboard.writeText(shrt).then(() => {btn.innerHTML = "Copied!";}).finally(() => {setTimeout(() => (btn.innerHTML = btnTxt), 1000);});
};
  `,
  };
  return <script dangerouslySetInnerHTML={inner} />;
};
