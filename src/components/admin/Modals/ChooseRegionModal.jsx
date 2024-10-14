import { Box, Modal } from "@mui/material";
import SelectFIeld from "components/general/Inputs/SelectFIeld";
import React from "react";
import { regions } from "utils/regions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 450 },
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "5px",
};

const ChooseRegionModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box style={style}>
          <SelectFIeld
            values={regions}
            value={0}
            fullWidth
            onChange={(e) => setStatus(e.target.value)}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default ChooseRegionModal;
