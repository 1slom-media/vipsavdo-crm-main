import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Divider from "@mui/material/Divider";
import PropTypes from "prop-types";
import { Stack } from "@mui/system";
import { Button, Typography } from "@mui/material";

function NotificationsDrawer({ open, onClose }) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{ zIndex: 2200, background: "transparent" }}
    >
      <Box sx={{ width: 420 }} role="presentation">
        <Stack p={2}>
          <Typography variant="h5">Xabarlar</Typography>
        </Stack>
        <Divider />
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                padding: "0 15px",
              }}
            >
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab
                  label="Barchasi"
                  value="1"
                  iconPosition="end"
                  icon={
                    <Box
                      sx={{
                        borderRadius: "3px",
                        color: "#ffffff",
                        backgroundColor: "#000000",
                        width: "20px",
                        fontSize: "13px",
                      }}
                    >
                      1
                    </Box>
                  }
                />
                <Tab
                  icon={
                    <Box
                      sx={{
                        borderRadius: "3px",
                        color: "#ffffff",
                        backgroundColor: "#000000",
                        width: "20px",
                        fontSize: "13px",
                      }}
                    >
                      1
                    </Box>
                  }
                  label="O'qilmagan"
                  value="2"
                  iconPosition="end"
                />
                <Tab
                  icon={
                    <Box
                      sx={{
                        borderRadius: "3px",
                        color: "#ffffff",
                        backgroundColor: "#000000",
                        width: "20px",
                        fontSize: "13px",
                      }}
                    >
                      1
                    </Box>
                  }
                  label="Arxivlangan"
                  value="3"
                  iconPosition="end"
                />
              </TabList>
            </Box>
            <TabPanel value="1">Item One</TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
          </TabContext>
        </Box>
      </Box>
    </SwipeableDrawer>
  );
}

NotificationsDrawer.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  onUpdateUnread: PropTypes.func,
  open: PropTypes.bool,
};

export default NotificationsDrawer;
