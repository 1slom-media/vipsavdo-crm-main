import { styled } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const StyledImgBox = styled(Box)(({ theme }) => ({
  width: "500px",
  height: "500px",
  borderRadius: "15px",
  overflow: "hidden",
}));
const StyledMiniBox = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  width: "80px !important",
  height: "80px !important",
  borderRadius: "5px",
  overflow: "hidden",
}));

const StyledBigBox = styled(Box)(({ theme }) => ({
  borderRadius: "15px",
  overflow: "hidden",
  width: "500px",
  height: "500px",
  paddingRight: "15px",
}));

const StyledMiniImgBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  maxWidth: "100%",
  objectFit: "cover",
}));

const WrapperBox = styled(Box)(({ theme }) => ({
  position: "relative",

  ".slick-prev:before ": {
    display: "none !important",
  },
  ".slick-next:before": {
    display: "none !important",
  },
}));

const StyledBottomBox = styled(Box)(({ theme }) => ({
  ":before": {
    background:
      "linear-gradient(to left, rgba(11, 15, 25, 0.867) 0%, rgba(11, 15, 25, 1) 100%)",
    bottom: "0",
    zIndex: 9,
    content: "url()",
    height: "90px",
    position: "absolute",
    width: "50px",
  },
  ":after": {
    background:
      "linear-gradient(to right, rgba(11, 15, 25, 0.867) 0%, rgba(11, 15, 25, 0.994) 100%)",
    bottom: "0",
    zIndex: 9,
    content: "url()",
    height: "90px",
    position: "absolute",
    width: "50px",
    right: 0,
  },
  // linear-gradient(to left, rgba(22, 28, 36, 0) 0%, rgb(22, 28, 36) 100%)
}));

const ImgCarousel = ({ imgArr }) => {
  const slider1 = useRef(null);
  const slider2 = useRef(null);
  useEffect(() => {
    slider1.current.slickGoTo(0);
    slider2.current.slickGoTo(0);
  }, []);

  const settings1 = {
    asNavFor: slider2.current,
    ref: slider1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
      <div
        className={className}
        onClick={onClick}
        style={{
          background: "rgba(0,0,0,.2)",
          padding: "20px ",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          right: "30px",
          transition: "all .3s ease-in-out",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          opacity: 0.7,
        }}
      >
        <ChevronRightIcon
          sx={{
            color: "#ffffff",
            fontSize: "30px",
          }}
        />
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        onClick={onClick}
        style={{
          background: "rgba(0,0,0,.2)",
          padding: "20px ",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          left: "30px",
          zIndex: "55",
          transition: "all .3s ease-in-out",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        }}
      >
        <ChevronLeftIcon style={{ color: "#ffffff", fontSize: "30px" }} />
      </div>
    );
  }

  const imgCount = imgArr?.length >= 5 ? 5 : imgArr?.length;

  const settings2 = {
    asNavFor: slider1.current,
    ref: slider2,
    slidesToShow: imgCount,
    // swipeToSlide: true,
    focusOnSelect: true,
    centerMode: true,
  };

  return (
    <WrapperBox>
      <Box>
        <Slider {...settings1}>
          {imgArr?.map((item, index) => (
            <StyledBigBox key={index}>
              <StyledImgBox component="img" src={item?.image?.[800]?.high} />
            </StyledBigBox>
          ))}
        </Slider>
      </Box>

      {imgCount <= 5 ? (
        <StyledBottomBox
          sx={{
            pt: "10px",
            ".slick-slider": {
              ".slick-list": {
                ".slick-track": {
                  margin: "0 auto !important",
                  ".slick-slide": {
                    ".minBoxWrapper": {
                      border: "2.6px solid transparent",
                    },
                  },
                  ".slick-current": {
                    ".minBoxWrapper": {
                      border: "2.6px solid #10B981 !important",
                    },
                  },
                },
              },
            },
            ":before": {
              display: "none",
            },

            ":after": {
              display: "none",
            },
          }}
        >
          <Slider {...settings2}>
            {imgArr?.map((item, index) => (
              <StyledMiniBox key={index} className="minBoxWrapper">
                <StyledMiniImgBox
                  component="img"
                  src={item?.image?.[800]?.high}
                />
              </StyledMiniBox>
            ))}
          </Slider>
        </StyledBottomBox>
      ) : (
        <StyledBottomBox
          sx={{
            pt: "10px",
            ".slick-slider": {
              ".slick-list": {
                ".slick-track": {
                  ".slick-slide": {
                    ".minBoxWrapper": {
                      border: "2.6px solid transparent",
                    },
                  },
                  ".slick-current": {
                    ".minBoxWrapper": {
                      border: "2.6px solid #10B981 !important",
                    },
                  },
                },
              },
            },
          }}
        >
          <Slider {...settings2}>
            {imgArr?.map((item, index) => (
              <StyledMiniBox key={index} className="minBoxWrapper">
                <StyledMiniImgBox
                  component="img"
                  src={item?.image?.[800]?.high}
                />
              </StyledMiniBox>
            ))}
          </Slider>
        </StyledBottomBox>
      )}
    </WrapperBox>
  );
};

export default ImgCarousel;
