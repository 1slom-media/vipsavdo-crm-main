import { Card } from "@mui/material";
import { styled } from "@mui/material/styles";

const Card1 = styled(Card)({
  position: "relative",
  padding: "1.5rem 1.75rem",
  height: "100%",
  boxShadow: "0px 8px 40px rgba(49, 32, 138, 0.05)",
  ["@media only screen and (max-width: 678px)"]: {
    padding: "1rem",
  },
});

export default Card1;
