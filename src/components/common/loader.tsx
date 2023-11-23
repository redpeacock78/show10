/** @jsx jsx */
import { jsx } from "hono-middleware";

export const Loader = () => {
  return (
    <div>
      <style>
        {`
          .loader {
            position: absolute;
            top: calc(50% - 32px);
            left: calc(50% - 32px);
            width: 64px;
            height: 64px;
          }

          .loader div {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            box-sizing: border-box;
            opacity: 0.8;
          }

          .one {
            border-top: 1px solid #8fb259;
            animation: rotate-left 1s linear infinite;
          }

          .two {
            border-right: 1px solid #cccc52;
            animation: rotate-right 1s linear infinite;
          }

          .three {
            border-bottom: 1px solid #ffd933;
            animation: rotate-right 1s linear infinite;
          }

          .four {
            border-left: 1px solid #ff7f00;
            animation: rotate-right 1s linear infinite;
          }

          @keyframes rotate-left {
            0% {
              transform: rotate(360deg);
            }
            100% {
              transform: rotate(0deg);
            }
          }

          @keyframes rotate-right {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
      <div class="loader">
        <div class="one"></div>
        <div class="two"></div>
        <div class="three"></div>
        <div class="four"></div>
      </div>
    </div>
  );
};
