import { Box, Button, Card, Stack, styled, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const StyledEmptyComponent = styled(Box)(({ theme }) => ({
  width: "200px",
  height: "200px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledEmptyCard = styled(Card)(({ theme }) => ({
  boxShadow: `none`,
  padding: "20px",
  borderRadius: "20px",
}));

const EmptyCard = ({
  btn = false,
  img,
  txt = "Hozircha mahsulot mavjud emas",
}) => {
  const router = useRouter();
  return (
    <StyledEmptyCard>
      <Stack direction="row" justifyContent="center" alignItems="center">
        <StyledEmptyComponent>
          <Box component="img" alt="cart" src={img} />
        </StyledEmptyComponent>
      </Stack>
      <Typography
        variant="body2"
        color="text.primary"
        textAlign="center"
        my={2}
      >
        {txt}
      </Typography>
      <Stack maxWidth="190px" mx="auto">
        {btn ? (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => router.push("/")}
          >
            Bosh sahifaga qaytish
          </Button>
        ) : null}
      </Stack>
    </StyledEmptyCard>
  );
};

export default EmptyCard;
