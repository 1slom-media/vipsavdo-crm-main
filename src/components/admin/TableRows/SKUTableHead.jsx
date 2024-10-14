import { TableCell, TableRow } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import skuHeading from "constants/productSKUHeader";
import StyledSKUHeadCell from "./SKUStyledHeadCell";

const SKUTableHead = ({ formData, handleChange }) => {
  return (
    <TableHead>
      <TableRow>
        {skuHeading?.map((sku, indx) => (
          <StyledSKUHeadCell
            key={indx}
            id={sku.id}
            value={sku.label}
            flash={sku.flash}
            formData={formData}
            handleChange={handleChange}
          />
        ))}
      </TableRow>
    </TableHead>
  );
};

export default SKUTableHead;
