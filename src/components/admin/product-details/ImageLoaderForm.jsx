import { Grid, Stack } from "@mui/material";
import ImagePicker from "./ImagePicker";
import PropTypes from "prop-types";
import Alert from "@mui/material/Alert";

const ImageLoaderForm = ({
  input: { value, onChange },
  color,
  isColorPhotos,
  meta,
}) => {
  const colorLength = value?.filter(
    (item) => item?.color === color?.view
  )?.length;
  const colorlessLength = value?.filter((item) => item?.color === null)?.length;
  const imagesQuantity = isColorPhotos ? colorLength + 1 : colorlessLength + 1;

  return (
    <Stack>
      <Grid container spacing={{ xs: 2, md: 4 }}>
        {Array(imagesQuantity)
          ?.fill()
          .map((_, indx) => {
            return (
              <Grid key={indx} xs={6} sm={3} item md={2}>
                <ImagePicker
                  indx={indx}
                  value={value}
                  onChange={onChange}
                  color={color}
                />
              </Grid>
            );
          })}
      </Grid>
      <Stack mt={2}>
        {meta.error && imagesQuantity === 1 && !isColorPhotos ? (
          <Alert severity="error">{meta.error}</Alert>
        ) : null}
      </Stack>
    </Stack>
  );
};

ImageLoaderForm.defaultProps = {
  input: { value: [], onChange: () => {} },
};

ImageLoaderForm.propTypes = {
  input: PropTypes.object,
};

export default ImageLoaderForm;
