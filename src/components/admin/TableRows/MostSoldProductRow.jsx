import { Box, Stack, Typography } from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
} from "components/general/StyledComponents/tablesStyled";
import React from "react";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import { useTranslation } from "react-i18next";

const MostSoldProductRow = ({ product, price, total }) => {
  const { t } = useTranslation("translation");

  return (
    <StyledTableRow>
      <StyledTableCell align="left">
        <Stack direction="row" justifyContent="flex-start" gap="10px">
          <Avatar
            alt={product.name}
            src={product.image[0]}
            sx={{ width: 50, height: 50 }}
          />
          <Stack direction="column" justifyContent="space-between">
            <Typography variant="subtitle2" color="secondary.100">
              {product.name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="secondary.100"
              sx={{ opacity: 0.7 }}
            >
              {product._id}
            </Typography>
          </Stack>
        </Stack>
      </StyledTableCell>
      <StyledTableCell align="left">
        {product.price?.toLocaleString()} so`m
      </StyledTableCell>
      <StyledTableCell align="center">
        {total} {t("Dona")}
      </StyledTableCell>
    </StyledTableRow>
  );
};

MostSoldProductRow.propTypes = {
  product: PropTypes.object,
};

MostSoldProductRow.defaultProps = {
  product: {},
};

export default MostSoldProductRow;
