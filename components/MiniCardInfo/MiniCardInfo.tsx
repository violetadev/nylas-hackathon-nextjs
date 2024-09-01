import { Box, IconButton, Typography } from "@mui/material";
import { CustomTypography } from "../CustomTypography";
import {
  TypographySubtitleCustomCss,
  TypographyTitleCustomCss,
} from "../CustomTypography/Customizations";

type TimeInfo = {
  icon: JSX.Element;
  text: string;
  label: string;
  handleClick?: () => void;
};

export const MiniCardInfo = ({ label, text, icon, handleClick }: TimeInfo) => {
  return (
    <Box
      onClick={handleClick}
      sx={{
        display: "flex",
        flexFlow: "row nowrap",
        alignItems: "center",
        margin: "8px",
      }}
    >
      <IconButton size="medium">{icon}</IconButton>
      <div>
        <CustomTypography
          text={label}
          variant="body1"
          additionalCSS={TypographySubtitleCustomCss}
        />
        <CustomTypography
          text={text}
          variant="body2"
          additionalCSS={TypographyTitleCustomCss}
        />
      </div>
    </Box>
  );
};
