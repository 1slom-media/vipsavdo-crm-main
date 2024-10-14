import {
  IconButton,
  Modal,
  Stack,
  TableCell,
  TextField,
  Typography,
} from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import { Box } from "@mui/system";
import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import { useTranslation } from "react-i18next";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  outline: "none",
  borderRadius: "5px",
};

const StyledSKUHeadCell = ({ value, id, flash, handleChange, formData }) => {
  const { t } = useTranslation("translation");
  const [open, setOpen] = React.useState(false);
  const [val, setVal] = React.useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFlashChange = () => {
    if (val >= 0) {
      let dataToSave = { ...formData };
      let skuList = formData.skuList?.map((skuObj, indx) => {
        const copyObj = { ...skuObj };
        if (copyObj["error"]) {
          copyObj["error"] = { ...copyObj["error"], [id]: false };
        } else {
          copyObj["error"] = { [id]: false };
        }
        copyObj[id] = val ? parseInt(val) : 0;
        if (id === "fullPrice" && copyObj["discountPrice"] > 0 && val > 0) {
          copyObj["purchasePrice"] =
            copyObj["fullPrice"] - copyObj["discountPrice"];
        }
        if (id === "fullPrice" && copyObj["discountPrice"] <= 0 && val > 0) {
          copyObj["purchasePrice"] = val;
        }
        if (id === "discountPrice" && val > 0 && copyObj["fullPrice"] > val) {
          copyObj["purchasePrice"] =
            copyObj["fullPrice"] - copyObj["discountPrice"];
        }
        if (id === "discountPrice" && val > 0 && copyObj["fullPrice"] < val) {
          copyObj["purchasePrice"] = 0;
          copyObj["fullPrice"] = 0;
          copyObj["error"] = { ...copyObj["error"], [id]: true };
        }
        return copyObj;
      });
      dataToSave["skuList"] = skuList;
      handleChange(dataToSave);
      setOpen(false);
    }
  };

  return (
    <TableCell>
      <Stack direction="row" alignItems="center" gap="5px">
        <Typography variant="caption" sx={{ textTransform: "capitalize" }}>
          {value}
        </Typography>
        {flash ? (
          <IconButton onClick={handleOpen} sx={{ borderRadius: "50%" }}>
            <BoltIcon
              sx={{ color: open ? "#10b981" : "inherit" }}
              fontSize="small"
            />
          </IconButton>
        ) : null}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              mb={2}
              variant="string"
              id="modal-modal-title"
              component="p"
            >
              {t("TypeForAllColumn")}
            </Typography>
            <Stack direction="row" alignItems="center" gap="5px">
              <TextField
                onChange={(e) => setVal(e.target.value)}
                value={val}
                size="small"
                placeholder="0"
                type="number"
              />
              <IconButton
                onClick={handleFlashChange}
                color="primary"
                sx={{
                  background: "#10b981",
                  "&:hover": { background: "#10b981" },
                }}
              >
                <CheckIcon sx={{ color: "#fff" }} />
              </IconButton>
            </Stack>
          </Box>
        </Modal>
      </Stack>
    </TableCell>
  );
};

export default StyledSKUHeadCell;
