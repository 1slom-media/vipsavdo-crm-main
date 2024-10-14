import { Box, Stack, styled, Typography } from "@mui/material";
import AlertOutlined from "components/icons/AlertOutlined";
import React from "react";

const StyledWarningBox = styled(Box)(({ theme }) => ({
  borderRadius: "10px",
  border: `1px solid ${theme.palette.secondary.main}`,
  padding: "20px",
  "& .warningHeader": {
    color: theme.palette.secondary.main,
  },
}));

const WarningCard = () => {
  return (
    <StyledWarningBox>
      <Stack direction="row" alignItems="center" gap="15px" mb={1}>
        <Box
          sx={{
            background: "#F8F6D9",
            padding: "12px",
            width: "48px",
            height: "48px",
            borderRadius: "50%",
          }}
        >
          <AlertOutlined sx={{ color: "#F8F6D9" }} />
        </Box>
        <Typography variant="h5" className="warningHeader">
          Eslatma
        </Typography>
      </Stack>
      <Typography variant="body1" color="text.secondary">
        Ba`zi holatlarda xaridor mahsulotni qaytaradi va mijozga mahsulot
        puli qaytarib beriladi. Shunday holatlarda tizim avtomatik tarzda admin
        hisobidan oldin qaytib kelgan mahsulot uchun to`lab berilgan pulni
        yechib oladi. Hisobingizda mablag` bo`lmagan holatda
        hisobingiz manfiy balansga almashtiriladi.
      </Typography>
    </StyledWarningBox>
  );
};

export default WarningCard;
