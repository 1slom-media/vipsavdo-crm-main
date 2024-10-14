import { Avatar, Box, styled } from "@mui/material";
import PropTypes from "prop-types";

const StyledContainer = styled(Box)(({ theme }) => ({}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 150,
  height: 150,
  [theme.breakpoints.down("sm")]: {
    width: 60,
    height: 60,
  },
}));

const AvatarUploader = ({ image }) => {
  return (
    <StyledContainer>
      <StyledAvatar src={image} />
    </StyledContainer>
  );
};

AvatarUploader.propTypes = {
  image: PropTypes.string,
};

AvatarUploader.defaultProps = {
  image: "https://www.dyslexic.com/wp-content/uploads/2016/06/userimage.jpg",
};

export default AvatarUploader;
