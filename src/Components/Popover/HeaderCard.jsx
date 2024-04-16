import React, { useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  Popover,
  IconButton,
  Typography,
} from "@mui/material";
import CustomizedTypography from "./CustomizedTypography";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function HeaderCard({
  title,
  subtitle,
  graphComponent,
  priceValue,
  percentage,
  trendingStatus,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div
      style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}
    >
      <Card
        style={{
          width: "600px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          backgroundColor: "#F3F4F6",
          border: "2px solid steelblue",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 12px",
          }}
        >
          <div>
            <CustomizedTypography style={{ fontSize: 18, fontWeight: "bold" }}>
              {title}
            </CustomizedTypography>
            <Typography
              variant="body1"
              style={{ fontSize: 18, color: "#616161", fontWeight: "bold" }}
            >
              {subtitle}
            </Typography>
          </div>
          <IconButton
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            <MoreVertIcon />
          </IconButton>
          <Typography
            variant="body1"
            style={{
              fontSize: 18,
              color: "#616161",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            Ec2 Instance Details
          </Typography>
          <Popover
            id="mouse-over-popover"
            sx={{
              pointerEvents: "none",
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Card style={{ padding: 12 }}>
              <CustomizedTypography
                variant="body1"
                component="div"
                style={{ fontSize: 14, color: "#616161" }}
              >
                {`Title: ${title}`}
                <br />
                {`Subtitle: ${subtitle}`}
                <br />
                {`Price Value: ${priceValue}`}
                <br />
                {`Percentage: ${percentage}`}
                <br />
                {`Trending Status: ${
                  trendingStatus === "up" ? "Trending Up" : "Trending Down"
                }`}
              </CustomizedTypography>
            </Card>
          </Popover>
        </div>
        <CardContent>
          <Grid container spacing={1} style={{ marginTop: 8 }}>
            {/* Left Content */}
            <Grid item xs={6} lg={7}>
              <CustomizedTypography
                variant="h5"
                component="div"
                style={{ fontWeight: "bold", fontSize: 24 }}
              >
                {priceValue}
              </CustomizedTypography>
              <div style={{ display: "flex", alignItems: "center" }}>
                {trendingStatus === "up" && (
                  <TrendingUpIcon style={{ color: "green", marginRight: 4 }} />
                )}
                {trendingStatus === "down" && (
                  <TrendingDownIcon style={{ color: "red", marginRight: 4 }} />
                )}
                <CustomizedTypography
                  variant="body1"
                  component="div"
                  style={{
                    color: trendingStatus === "up" ? "green" : "red",
                    fontSize: 16,
                  }}
                >
                  {percentage}
                </CustomizedTypography>
              </div>
            </Grid>
            <Grid item xs={6} lg={5}>
              {graphComponent && graphComponent}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
export default HeaderCard;
