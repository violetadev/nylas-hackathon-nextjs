/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

type TruncatedTextProps = {
  text: string;
  maxWidth?: string;
  component?: JSX.Element;
};
export const TruncatedText = ({
  text,
  component,
  maxWidth,
}: TruncatedTextProps) => {
  return (
    <div
      css={css`
        position: relative;
        display: inline-block;
        max-width: ${maxWidth || "200px"};

        cursor: default;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        &:hover {
          overflow: visible;
          white-space: normal;
          overflow-wrap: break-word;
          height: auto;
        }
      `}
      data-full-text={text}
    >
      <>{component ? component : <span>{text}</span>}</>
    </div>
  );
};
