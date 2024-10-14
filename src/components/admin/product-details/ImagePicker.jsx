import * as React from "react";
import { styled } from "@mui/material/styles";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { generateMediaLinks } from "api/requests";
import useAlert from "hooks/useAlert";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "react-i18next";
import { Close } from "@mui/icons-material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ImagePicker = ({ value, onChange, color, indx }) => {
  const alert = useAlert();
  const theme = useTheme();
  const { t } = useTranslation("translation");

  const token = useSelector((state) => state.auth.token);
  const ref = React.useRef();
  const image = value && value[indx] ? value[indx] : null;

  const [loading, setLoading] = React.useState(false);

  const handleImagePicker = async (e) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("images", e.target.files[0]);
    if (color) {
      formData.append("color", color?.view);
    }
    const media = await generateMediaLinks({ data: formData, token, alert });
    setLoading(false);
    onChange([
      ...value,
      { ...media?.images[0], color: color ? color?.view : null },
    ]);
  };

  const handleDelete = () => {
    const filteredImages = value?.filter(
      (item) => item.imageKey !== image?.imageKey
    );
    onChange(filteredImages);
  };

  return (
    <Stack gap="10px">
      <VisuallyHiddenInput
        onChange={handleImagePicker}
        type="file"
        accept="image/*"
        ref={ref}
      />
      <Box
        height={180}
        width={150}
        sx={{
          border: "1px dotted",
          borderColor: theme.palette.divider,
          borderRadius: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          backgroundImage: `url(${image ? image["image"][540]["high"] : "/"})`,
          backgroundSize: "cover",
          position: "relative",
        }}
      >
        {image ? (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              zIndex: 1000,
            }}
          >
            <IconButton
              onClick={handleDelete}
              color="error"
              sx={{ borderRadius: "50%" }}
            >
              <Close />
            </IconButton>
          </Box>
        ) : null}
        {!loading ? (
          <Stack
            alignItems="center"
            gap="10px"
            onClick={() => {
              if (!loading) {
                ref.current.click();
              }
            }}
          >
            <CameraAltIcon
              sx={{
                color: image ? "#000000" : "#ffffff",
                display: image ? "none" : "block",
              }}
            />
            <Typography
              variant="caption"
              sx={{
                color: image ? "#000000" : "#ffffff",
                display: image ? "none" : "block",
              }}
            >
              {t("UploadPhoto")}
            </Typography>
          </Stack>
        ) : (
          <CircularProgress />
        )}
      </Box>
    </Stack>
  );
};

export default ImagePicker;
