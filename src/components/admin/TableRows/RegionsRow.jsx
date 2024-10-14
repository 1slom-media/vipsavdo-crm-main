import {
  StyledTableCell,
  StyledTableRow,
} from "components/general/StyledComponents/tablesStyled";
import React from "react";
import { getCity } from "utils/helpers";

const RegionsRow = ({ id, count }) => {
  return (
    <StyledTableRow>
      <StyledTableCell align="left">{id}</StyledTableCell>
      <StyledTableCell align="left">{getCity(id)}</StyledTableCell>
      <StyledTableCell align="left">{count}</StyledTableCell>
    </StyledTableRow>
  );
};

export default RegionsRow;
