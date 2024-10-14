import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Stack, Tab, Tabs, Typography } from "@mui/material";
import NotifyOutlined from "components/icons/NotificationOutlined";
import Badge from "@mui/material/Badge";
import TabPanel from "../Dashboard/TabPanel";
import {
  StyledIconButton,
  StyledRoundedBox,
  StyledDeleteBtn,
  StyledRoundedOutlinedBox,
} from "./styledComponents";
import NotificationWrapper from "../Dashboard/NotificationWrapper";
import { t } from "i18next";

const paperProps = {
  elevation: 0,
  sx: {
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    mt: 1.5,
    borderRadius: "15px",
    "& .MuiMenu-list": {
      padding: "16px",
      maxHeight: "calc(100vh - 80px)",
      overflow: "auto",
      /* width */
      "&::-webkit-scrollbar": {
        width: "8px",
      },

      /* Track */
      "&::-webkit-scrollbar-track": {
        background: "#f1f1f1",
        borderTopRightRadius: "15px",
        // borderTopRightRadius: "15px",
        borderBottomRightRadius: "15px",
      },

      /* Handle */
      "&::-webkit-scrollbar-thumb": {
        background: "#888",
        borderRadius: "8px",
        // borderBottomRightRadius: "15px",
      },

      /* Handle on hover */
      "&::-webkit-scrollbar-thumb:hover": {
        background: "#555",
      },
    },
    "& .MuiAvatar-root": {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
  },
};

function NotificationMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState(0);
  const open = Boolean(anchorEl);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Xabarlar menyusi">
          <Badge badgeContent={4} color="error">
            <StyledIconButton
              onClick={handleClick}
              size="medium"
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <NotifyOutlined />
            </StyledIconButton>
          </Badge>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={paperProps}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        className="notification-menu__popover"
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="body1" color="text.black">
            {t("Notification")}
          </Typography>
          <StyledRoundedBox>12</StyledRoundedBox>
        </Stack>
        <Stack sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                label={
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    gap="10px"
                  >
                    <Typography>{t("Quests")}</Typography>
                    <StyledRoundedOutlinedBox>4</StyledRoundedOutlinedBox>
                  </Stack>
                }
                {...a11yProps(0)}
              />
              <Tab
                label={
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    gap="10px"
                  >
                    <Typography>{t("Quests")}</Typography>
                    <StyledRoundedOutlinedBox>4</StyledRoundedOutlinedBox>
                  </Stack>
                }
                {...a11yProps(1)}
              />
              <StyledDeleteBtn color="error">{t("Delete")}</StyledDeleteBtn>
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <NotificationWrapper data={fakeData} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <NotificationWrapper data={fakeData} />
          </TabPanel>
        </Stack>
      </Menu>
    </React.Fragment>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const fakeData = [
  {
    img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Oscar William",
    isAdmin: true,
    msg: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been",
    createdAt: "2023-02-21T00:00",
    isShown: true,
  },
  {
    img: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Oscar Black",
    isAdmin: false,
    msg: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been",
    createdAt: "2023-02-21T00:00",
    isShown: true,
  },
  {
    img: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Oscar William",
    isAdmin: false,
    msg: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been",
    createdAt: "2023-02-20T00:00",
    isShown: false,
  },
  {
    img: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Oscar William",
    isAdmin: true,
    msg: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been",
    createdAt: "2023-02-20T00:00",
    isShown: false,
  },
  {
    img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Oscar William",
    isAdmin: true,
    msg: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been",
    createdAt: "2023-02-20T00:00",
    isShown: false,
  },
  {
    img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Oscar William",
    isAdmin: true,
    msg: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been",
    createdAt: "2023-02-19T00:00",
    isShown: false,
  },
];

export default NotificationMenu;
