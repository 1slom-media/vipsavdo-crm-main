import { Box, Grid, Stack, styled } from "@mui/material";
import React, { useState } from "react";
import Zorro from "../Carusel/ZorroCarusel";
import Karol from "../Carusel/KarolCarusel";
import Vip from "../Carusel/VipCarusel";

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
const SiteBannerFirst = () => {
  const [state, setState] = useState(1);
  const [classState, setClassState] = useState(1);
  const data = [];
  const handleChoseBanner = (id) => {
    setClassState(id);
  };

  return (
    <Stack>
      <Grid container spacing={2} mb={2}>
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

      {classState === 3 ? (
        <Grid container spacing={2}>
          {ZorroData.map((item, key) => (
            <Grid item xs={12} md={6} key={key}>
              <Zorro data={item} />
            </Grid>
          ))}
        </Grid>
      ) : null}

      {classState === 2 ? (
        <Grid container spacing={2}>
          {VipData.map((item, key) => (
            <Grid item xs={12} md={6} key={key}>
              <Vip data={item} />
            </Grid>
          ))}
        </Grid>
      ) : null}

      {classState === 1 ? (
        <Grid container spacing={2}>
          {karolData.map((item, key) => (
            <Grid item xs={12} md={6} key={key}>
              <Karol data={item} />
            </Grid>
          ))}
        </Grid>
      ) : null}
    </Stack>
  );
};

export default SiteBannerFirst;

const karolData = [
  {
    title: "Lorem Ipsum is simply ",
    text: "Lorem Ipsum is simply industry's standard dummy text ever since the 1500s, Lorem Ipsum has",
    img: "/assets/media/iphone.png",
    btnLink: "#",
  },
  {
    title: "Lorem Ipsum is simply ",
    text: "Lorem Ipsum is simply industry's standard dummy text ever since the 1500s, Lorem Ipsum has",
    img: "/assets/media/iphone.png",
    btnLink: "#",
  },
  {
    title: "Lorem Ipsum is simply ",
    text: "Lorem Ipsum is simply industry's standard dummy text ever since the 1500s, Lorem Ipsum has",
    img: "/assets/media/iphone.png",
    btnLink: "#",
  },
];
const VipData = [
  {
    title: "Lorem Ipsum is simply ",
    text: "Lorem Ipsum is simply industry's standard dummy text ever since the 1500s, Lorem Ipsum has",
    img: "/assets/media/caruselImg.png",
    btnLink: "#",
  },
  {
    title: "Lorem Ipsum is simply ",
    text: "Lorem Ipsum is simply industry's standard dummy text ever since the 1500s, Lorem Ipsum has",
    img: "/assets/media/caruselImg.png",
    btnLink: "#",
  },
  {
    title: "Lorem Ipsum is simply ",
    text: "Lorem Ipsum is simply industry's standard dummy text ever since the 1500s, Lorem Ipsum has",
    img: "/assets/media/caruselImg.png",
    btnLink: "#",
  },
];
const ZorroData = [
  {
    title: "Lorem Ipsum is simply ",
    text: "Lorem Ipsum is simply industry's standard dummy text ever since the 1500s, Lorem Ipsum has",
    img: "/assets/media/laptop.png",
    btnLink: "#",
  },
  {
    title: "Lorem Ipsum is simply ",
    text: "Lorem Ipsum is simply industry's standard dummy text ever since the 1500s, Lorem Ipsum has",
    img: "/assets/media/laptop.png",
    btnLink: "#",
  },
  {
    title: "Lorem Ipsum is simply ",
    text: "Lorem Ipsum is simply industry's standard dummy text ever since the 1500s, Lorem Ipsum has",
    img: "/assets/media/laptop.png",
    btnLink: "#",
  },
];
