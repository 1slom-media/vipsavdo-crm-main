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
import ViewIcon from "components/icons/ViewIcon";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import useAlert from "hooks/useAlert";
import { useRouter } from "next/router";
import {
  deleteFeatureByUid,
  getFeaturesList,
} from "../../../redux-store/admin/features/features.slice";
import FeatureUpdateModal from "../Modals/FeatureUpdateModal";
import { useTranslation } from "react-i18next";

const FeaturesRow = ({ title, uid, createdAt, updatedAt, _id }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const router = useRouter();
  const { t } = useTranslation("translation");

  const page = router?.query?.page;
  const limit = router?.query?.limit;

  const token = useSelector((state) => state.auth.token);
  const isLoading = useSelector((state) => state.features.isLoading);
  const [modal, setModal] = useState(false);

  const callback = () => {
    dispatch(getFeaturesList({ token, params: { page, limit } }));
  };

  const handleDelete = (values) => {
    dispatch(
      deleteFeatureByUid({
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
        {title ? title[router.locale] : null}
      </StyledTableCell>
      <StyledTableCell align="left">
        {23} {t("Dona")}
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography variant="subtitle1" color="secondary.100">
          {createdAt
            ? format(new Date(createdAt), "dd-MMMM, HH:mm", { locale: uz })
            : ""}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography variant="subtitle1" color="secondary.100">
          {updatedAt
            ? format(new Date(updatedAt), "dd-MMMM, HH:mm", { locale: uz })
            : ""}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="right">
        <Box display="flex" alignItems="right" justifyContent="right" gap={2}>
          <Link
            href={`/dashboard/products/features/${uid}?name=${
              title[router.locale]
            }`}
          >
            <StyledEditeBtn>
              <ViewIcon />
            </StyledEditeBtn>
          </Link>
          <FeatureUpdateModal name={title} uid={uid} />
          {/* <ConfirmDeleteModal
            isOpen={modal}
            handleDeleteModal={() => setModal(!modal)}
            error="Ushbu Kategoriyani o'chirilmoqda. Tasdiqlaysizmi?"
            handleDelete={handleDelete}
            loading={isLoading}
          /> */}
        </Box>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default FeaturesRow;
