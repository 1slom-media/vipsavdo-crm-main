import { useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import SettingsDrawer from "./settings-drawer";
import { motion } from "framer-motion";

export const SettingsButton = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        component={motion.div}
        animate={{
          rotate: [0, open ? 0 : 360],
        }}
        transition={{
          duration: 12,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        <Tooltip title="Sozlamalar">
          <IconButton
            component={motion.button}
            whileTap="tap"
            whileHover="hover"
            aria-label="settings"
            onClick={handleOpen}
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              
            }}
          >
            <SettingsIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <SettingsDrawer onClose={handleClose} open={open} />
    </>
  );
};
