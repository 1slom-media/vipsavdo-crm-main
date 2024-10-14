import { Box, Typography } from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
} from "components/general/StyledComponents/tablesStyled";
import React, { useState } from "react";
import { StyledEditeBtn } from "./ProductsRow";
import ConfirmDeleteModal from "../Modals/ConfirmDeleteModal.jsx ";
import format from "date-fns/format";
import uz from "date-fns/locale/uz";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import useAlert from "hooks/useAlert";
import { useRouter } from "next/router";
import { deleteBrands, getBrands } from "redux-store/brands/brands.slice";
import BrandsUpdateModal from "../Modals/BrandsUpdateModal";
import { useTranslation } from "react-i18next";

const BrandRow = ({ title, uid, createdAt, updatedAt }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const router = useRouter();
  const { t } = useTranslation("translation");

  const page = router?.query?.page;
  const limit = router?.query?.limit;

  const token = useSelector((state) => state.auth.token);
  const isLoading = useSelector((state) => state.brands?.isDeleteLoading);
  const [modal, setModal] = useState(false);

  const callback = () => {
    dispatch(getBrands());
  };

  const handleDelete = (values) => {
    dispatch(
      deleteBrands({
        uid,
        token,
        alert,
        callback,
        close: () => setModal(!modal),
      })
    );
  };

  return (
    <StyledTableRow>
      <StyledTableCell align="center">
        <Typography variant="subtitle1" color="secondary.100">
          #{uid}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="left">
        <Typography color="text" fontSize="14px">
          {title}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography variant="subtitle1" color="secondary.100" fontSize="14px">
          {createdAt
            ? format(new Date(createdAt), "dd-MMMM, HH:mm", { locale: uz })
            : ""}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography variant="subtitle1" color="secondary.100" fontSize="14px">
          {updatedAt
            ? format(new Date(updatedAt), "dd-MMMM, HH:mm", { locale: uz })
            : ""}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="right">
        <Box display="flex" alignItems="right" justifyContent="right" gap={2}>
          <BrandsUpdateModal
            initialValues={{
              uid: uid,
              title: title,
            }}
          />
          {/* <ConfirmDeleteModal
            isOpen={modal}
            handleDeleteModal={() => setModal(!modal)}
            error={t("ConfirmDeleteBrand")}
            handleDelete={handleDelete}
            loading={isLoading}
          /> */}
        </Box>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default BrandRow;
