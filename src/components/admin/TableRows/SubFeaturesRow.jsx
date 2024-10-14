import { Box, Typography } from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
} from "components/general/StyledComponents/tablesStyled";
import React, { useState } from "react";
import ConfirmDeleteModal from "../Modals/ConfirmDeleteModal.jsx ";
import format from "date-fns/format";
import uz from "date-fns/locale/uz";
import { useDispatch, useSelector } from "react-redux";
import useAlert from "hooks/useAlert";
import {
  deleteSubFeatureByUid,
  getSubFeaturesList,
} from "../../../redux-store/admin/subfeatures/subfeatures.slice";
import { useRouter } from "next/router";
import SubFeaturesUpdateModal from "../Modals/SubFeatureUpdateModal";

const SubFeaturesRow = ({
  label,
  value,
  index,
  id,
  uid,
  createdAt,
  updatedAt,
  _id,
}) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const router = useRouter();

  const token = useSelector((state) => state.auth.token);
  const isLoading = useSelector((state) => state.features.isLoading);
  const [modal, setModal] = useState(false);

  const callback = () => {
    dispatch(getSubFeaturesList({ token, params: { id: router.query.id } }));
  };

  const handleDelete = (values) => {
    dispatch(
      deleteSubFeatureByUid({
        uid: _id,
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
          #{index + 1}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="left">{label[router.locale]}</StyledTableCell>
      <StyledTableCell
        align="left"
        style={{ color: value?.startsWith("#") ? value : "inherit" }}
      >
        {value}
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
          <SubFeaturesUpdateModal uid={_id} name={label} view={value} />
          {/*<Link href={`/dashboard/products/features/${uid}?name=${label}`}>*/}
          {/*    <StyledEditeBtn>*/}
          {/*        <ViewIcon/>*/}
          {/*    </StyledEditeBtn>*/}
          {/*</Link>*/}
          
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

export default SubFeaturesRow;
