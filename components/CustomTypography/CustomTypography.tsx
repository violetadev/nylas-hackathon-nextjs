import { Variant } from "@mui/material/styles/createTypography";
import { StringMap } from "../../interfaces";
import { Typography } from "@mui/material";

export const CustomTypography = ({
  text,
  additionalCSS,
  variant,
}: {
  text: string;
  additionalCSS?: StringMap;
  variant: Variant;
}) => (
  <Typography variant={variant} sx={additionalCSS && additionalCSS}>
    {text}
  </Typography>
);
