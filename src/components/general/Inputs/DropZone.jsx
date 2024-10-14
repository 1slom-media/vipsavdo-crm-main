import { Box, Button, Divider, Stack, styled, Typography } from "@mui/material";
import PhotosOutlined from "components/icons/PhotosOutlined";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";

const StyledIconBox = styled(Stack)(({ theme }) => ({
  "& .MuiSvgIcon-root": {
    fontSize: "5rem",
  },
}));

const DropZone = ({ onChange, title, imageSize, progress, bg, ...props }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (onChange) onChange(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: ".jpeg,.jpg,.png,.gif",
    maxFiles: 10,
  });
  return (
    <Box
      py={4}
      px={{
        md: 10,
        xs: 4,
      }}
      display="flex"
      minHeight="200px"
      alignItems="center"
      borderRadius="10px"
      flexDirection="column"
      border="2px dashed #4296FF"
      justifyContent="center"
      textAlign="center"
      bgcolor={isDragActive ? "grey.200" : "background.default"}
      mb={1}
      sx={{
        transition: "all 250ms ease-in-out",
        outline: "none",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        ...props.sx,
      }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <StyledIconBox justifyContent="center" alignItems="center" mb={2}>
        <PhotosOutlined fontSize="10em" />
      </StyledIconBox>

      <Typography variant="subtitle1" color="grey.600" mb={2}>
        1080*1440 hajmdagi rasm talab qilinadi
      </Typography>

      <Typography variant="body2" mb={1} color="info.900">
        {title || "Faylni shu yerga olib keling"}
      </Typography>

      <Divider
        sx={{
          "::before, ::after": {
            borderColor: "grey.300",
            width: 70,
          },
        }}
      >
        <Typography variant="subtitle1" color="text.disabled" px={1}>
          yoki
        </Typography>
      </Divider>

      <Button
        type="button"
        variant="outlined"
        color="info"
        sx={{
          px: 4,
          my: 2,
        }}
      >
        Fayllarni tanlang
      </Button>
      {progress ? (
        <Typography
          variant="subtitle1"
          sx={{ color: "red", fontSize: "16px", fontWeight: 700, mt: 2 }}
        >
          Fayl {progress}% yuklandi...
        </Typography>
      ) : undefined}
    </Box>
  );
};

export default DropZone;

DropZone.propTypes = {
  onChange: PropTypes.func,
  title: PropTypes.string,
  imageSize: PropTypes.string,
  progress: PropTypes.number,
  bg: PropTypes.string,
  props: PropTypes.object,
};

DropZone.defaultProps = {
  onChange: () => {},
  title: "",
  imageSize: "",
  progress: 0,
  bg: "",
  props: {},
};
