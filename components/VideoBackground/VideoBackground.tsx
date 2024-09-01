/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import videoFile from "../../assets/star.mp4";

export const VideoBackground = ({ children }: { children: JSX.Element }) => {
  return (
    <div css={containerStyle}>
      <video autoPlay loop muted playsInline css={videoStyle}>
        <source src={videoFile} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div css={contentOverlayStyle}>{children}</div>
    </div>
  );
};

const containerStyle = css`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const videoStyle = css`
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -1;
  transform: translate(-50%, -50%);
  background-size: cover;
`;

const contentOverlayStyle = css`
  position: relative;
  z-index: 1;
  color: white;
  text-align: center;
  padding: 20px;
`;
