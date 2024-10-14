import {
  StyledTableCell,
  StyledTableRow,
} from "components/general/StyledComponents/tablesStyled";
import React from "react";
import Typography from "@mui/material/Typography";

const GameListRow = (data) => {
  return (
    <StyledTableRow>
      <StyledTableCell align="left">
        <Typography variant="subtitle1" color="text.lightGray">
          {data.index}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography variant="subtitle1" color="text.lightGray">
          {data.username}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography variant="subtitle1" color="text.lightGray">
          {data.phone}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography variant="subtitle1" color="text.lightGray">
          {data.soldOrderCount}
        </Typography>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default GameListRow;
