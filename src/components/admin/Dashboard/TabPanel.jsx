import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

export default TabPanel;

TabPanel.defaultValues = {
  children: null,
  index: 0,
  value: 0,
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number,
  value: PropTypes.number,
};
