import * as React from "react";
import Typography from "@mui/material/Typography";

const CustomizedTypography = (props) => (
  <Typography
    {...props}
    sx={{
      fontFamily: "'Satoshi', sans-serif", 
    }}
  />
);

export default CustomizedTypography;