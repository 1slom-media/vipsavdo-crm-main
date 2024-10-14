import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "next/link";
import { Breadcrumbs, Typography } from "@mui/material";
import PropTypes from "prop-types";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const BreadCurmbsCustom = ({ list = [] }) => {
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      sx={{
        mb: 2,
        a: {
          color: "#fff !important",
        },
      }}
    >
      {list.map((item, index) => {
        if (index === 0) {
          return (
            <a
              key={item?.link}
              underline="hover"
              style={{ display: "flex", alignItems: "center" }}
              href={item.link}
            >
              <FiberManualRecordIcon
                fontSize="inherit"
                style={{
                  color: "#10B981",
                }}
              />
              <Typography ml={1}>{item.label}</Typography>
            </a>
          );
        } else if (index === list.length - 1) {
          return (
            <Typography
              key={item?.link}
              sx={{ display: "flex", alignItems: "center" }}
              color="text.primary"
            >
              {item.label}
            </Typography>
          );
        } else if (item.link) {
          return (
            <Link
              key={item?.link}
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
              color="inherit"
              href={item.link}
            >
              {item.label}
            </Link>
          );
        }
      })}
    </Breadcrumbs>
  );
};

BreadCurmbsCustom.propTypes = {
  list: PropTypes.array,
};
BreadCurmbsCustom.defaultProps = {
  list: [],
};

export default BreadCurmbsCustom;
