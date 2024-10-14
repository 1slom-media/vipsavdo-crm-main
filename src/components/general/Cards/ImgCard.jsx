import { Box, Button, IconButton, Stack, styled } from "@mui/material";
import DeleteIcon from "components/icons/DeleteIcon";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

const StyledCard = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "150px",
  "& .btn": {
    position: "absolute",
    right: "-10px",
    top: "-10px",
    minWidth: "30px",
    maxWidth: "30px",
    maxHeight: "30px",
    minHeight: "30px",
    padding: 0,
    zIndex: 2,
    borderRadius: "50%",
    backgroundColor: theme.palette.error[400],
    color: theme.palette.text.contrastText,
    "& .MuiSvgIcon-root": {
      fill: "#fff",
    },
  },
  "& .img": {
    position: "absolute",
    borderRadius: "4px",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
    objectFitL: "cover",
  },
}));

const ImgCard = ({ img, obj, input: { onChange, value } }) => {
  const matchIndex = value?.indexOf(obj);
  const filtered = value?.filter((item, key) => key !== matchIndex);
  return (
    <StyledCard>
      <Box component="img" className="img" src={img} alt={img} />
      <Stack
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          zIndex: 2,
        }}
        alignItems="flex-end"
        p={1}
      >
        <IconButton
          sx={{
            background: "#000000",
            borderRadius: "50%",
            "&:hover": { background: "#000000c4" },
          }}
          onClick={() => onChange(filtered)}
          color="error"
          size="small"
        >
          <CloseIcon sx={{ fontSize: "18px", color: "#ffffff" }} />
        </IconButton>
      </Stack>
    </StyledCard>
  );
};

ImgCard.defaultProps = {
  input: { onChange: () => {}, value: [] },
};

export default ImgCard;
