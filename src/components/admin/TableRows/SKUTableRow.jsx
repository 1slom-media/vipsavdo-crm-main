import { Stack, TableCell, TextField, Typography } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import { useTranslation } from "react-i18next";

const SkuTableRow = ({
  handleChange,
  formData,
  fullPrice,
  discountPrice,
  purchasePrice,
  referalPrice,
  boughtPrice,
  skuTitle,
  availableAmount,
  characteristicsTitle,
  uid,
}) => {
  const { t } = useTranslation("translation");

  const handleInputChange = (e) => {
    let val = parseInt(e.target.value);
    const selectionID = e.target.name;
    if (val >= 0 || !val) {
      let dataToSave = { ...formData };
      let skuList = formData.skuList?.map((skuObj, indx) => {
        if (skuObj.uid === uid) {
          const copyObj = { ...skuObj };
          copyObj[selectionID] = val;
          if (selectionID === "discountPrice" && copyObj["fullPrice"] > val) {
            copyObj["purchasePrice"] = copyObj["fullPrice"] - val;
          }
          if (
            selectionID === "fullPrice" &&
            val > copyObj["discountPrice"] &&
            copyObj["discountPrice"] > 0
          ) {
            copyObj["purchasePrice"] = val - copyObj["discountPrice"];
          }
          if (selectionID === "fullPrice" && copyObj["discountPrice"] <= 0) {
            copyObj["purchasePrice"] = val;
          }
          if (copyObj["fullPrice"] < copyObj["discountPrice"]) {
            copyObj["purchasePrice"] = 0;
          }
          return copyObj;
        } else {
          return skuObj;
        }
      });
      dataToSave["skuList"] = skuList;
      handleChange(dataToSave);
    }
  };
  return (
    <TableRow
      sx={{
        "&:last-child th, &:last-child td": {
          borderBottom: 0,
        },
      }}
    >
      <TableCell sx={{ py: 0.7 }}>
        <Stack gap="5px">
          <Typography variant="string" fontWeight={400}>
            {characteristicsTitle}
          </Typography>
          <Typography variant="string" fontWeight={400} sx={{ opacity: 0.7 }}>
            {skuTitle}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell sx={{ py: 0 }}>
        <TextField
          size="small"
          sx={{ width: "120px" }}
          placeholder="0"
          type="number"
          InputProps={{ sx: { padding: 0 } }}
          value={availableAmount}
          onChange={handleInputChange}
          name="availableAmount"
        />
      </TableCell>
      <TableCell sx={{ py: 0 }}>
        <TextField
          size="small"
          sx={{ width: "120px" }}
          placeholder="0"
          type="number"
          InputProps={{ sx: { padding: 0 } }}
          value={fullPrice}
          onChange={handleInputChange}
          name="fullPrice"
        />
      </TableCell>
      <TableCell sx={{ py: 0 }}>
        <TextField
          size="small"
          sx={{ width: "120px" }}
          placeholder="0"
          type="number"
          value={discountPrice}
          onChange={handleInputChange}
          name="discountPrice"
        />
      </TableCell>
      <TableCell sx={{ py: 0 }}>
        <Typography variant="string">
          {purchasePrice?.toLocaleString()}
        </Typography>
      </TableCell>
      <TableCell sx={{ py: 0 }}>
        <TextField
          size="small"
          sx={{ width: "120px" }}
          placeholder="0"
          type="number"
          value={referalPrice}
          onChange={handleInputChange}
          name="referalPrice"
        />
      </TableCell>
      <TableCell sx={{ py: 0 }}>
        <TextField
          size="small"
          sx={{
            width: "120px",
          }}
          placeholder="0"
          type="number"
          value={boughtPrice}
          onChange={handleInputChange}
          name="boughtPrice"
        />
      </TableCell>
      <TableCell>
        <Stack>
          <Typography variant="caption">{t("Uncreated")}</Typography>
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default SkuTableRow;
