import {
  Box,
  Button,
  Grid,
  Stack,
  Typography,
  styled,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SiteBannerFirst from "./SiteBannerFirst";
import Layout1 from "../Carusel/Layout1";
import Layout2 from "../Carusel/Layout2";
import Layout3 from "../Carusel/Layout3";
import { useTranslation } from "react-i18next";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const StyledButton = styled(Button)(({ theme, isActive }) => ({
  background: theme.palette.disabled[100],
  color: theme.palette.text.legacy,
  fontWeight: 500,
  fontSize: 14,
  borderRadius: "10px",
  ...(isActive && {
    background: theme.palette.primary.contrastText,
    border: "1px solid",
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
  }),
}));

const StyledImg = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "200px",
  border: `2px solid transparent`,
  borderRadius: "20px",
  cursor: "pointer",
  "&.active": {
    border: `2px solid ${theme.palette.primary.main}`,
  },
}));

const SiteBanner = () => {
  const { t } = useTranslation("translation");
  const [tab, setTab] = useState(0);
  const [classState, setClassState] = useState(1);

  const handelTab0 = () => {
    setTab(0);
  };

  const handleTab1 = () => {
    setTab(1);
  };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChoseBanner = (id) => {
    setClassState(id);
  };
  return (
    <Stack>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        aria-label="visible arrows tabs example"
        sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            "&.Mui-disabled": { opacity: 0.3 },
          },
        }}
      >
        <Tab label={t("Added")} {...a11yProps(0)} />
        <Tab label={t("Add")} {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <SiteBannerFirst />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container spacing={2} pb={3}>
          <Grid item xs={12} md={3.3}>
            <Box width="100%">
              <StyledImg
                component="img"
                src="/assets/media/shablon1.png"
                alt="banner"
                onClick={() => handleChoseBanner(1)}
                className={`${classState === 1 ? "active" : ""}`}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={3.3}>
            <Box width="100%">
              <StyledImg
                component="img"
                src="/assets/media/shablon2.png"
                alt="banner"
                onClick={() => handleChoseBanner(2)}
                className={`${classState === 2 ? "active" : ""}`}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={3.3}>
            <Box width="100%">
              <StyledImg
                component="img"
                src="/assets/media/shablon3.png"
                alt="banner"
                onClick={() => handleChoseBanner(3)}
                className={`${classState === 3 ? "active" : ""}`}
              />
            </Box>
          </Grid>
        </Grid>
        <Divider variant="fullWidth" orientation="horizontal" />

        {classState === 1 ? <Layout1 /> : null}
        {classState === 2 ? <Layout2 /> : null}
        {classState === 3 ? <Layout3 /> : null}
      </TabPanel>
    </Stack>
  );
};

export default SiteBanner;
