import DropZone from "components/general/Inputs/DropZone";
import PropTypes from "prop-types";

const ImagePicker = ({ input, meta }) => {
  return (
    <DropZone
      {...input}
      {...meta}
      onChange={(files) => {
        input.onChange([...input.value, ...files]);
      }}
    />
  );
};

ImagePicker.propTypes = {
  props: {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    classes: PropTypes.object,
    meta: PropTypes.object,
    input: PropTypes.object,
    custom: PropTypes.object,
  },
};

ImagePicker.defaultProps = {
  props: {
    label: "",
    classes: {},
    meta: {},
    input: {},
    custom: {},
  },
};

export default ImagePicker;
