import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { Box, Grid, Typography, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const StyledFilterBox = styled(Grid)(({ theme }) => ({
  position: "absolute",
  background: theme.palette.neutral[900],
  width: "100%",
  height: "200px",
  zIndex: 5,
  padding: "10px 15px",
  overflow: "hidden",
  useSelector: "none",
}));
const StyledProductBox = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  padding: "5px",
}));

const StyledImgBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  borderRadius: "50%",
}));

export default function ProductSelectInput({ setUid }) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const token = useSelector((state) => state.auth.token);
  const router = useRouter();
  const locale = router?.locale;
  const [open, setOpen] = useState(false);
  useEffect(() => {
    async function getProducts() {
      try {
        setLoading(true);
        const res = await axios({
          method: "GET",
          url: `${process.env.NEXT_PUBLIC_API}/product/admin/all`,
          params: { filter: search, limit: 99999 },
          headers: { auth: token },
        });
        setLoading(false);
        setData(res.data?.products);
      } catch (error) {
        setLoading(false);
        setData([]);
      }
    }

    getProducts();
  }, [search, token]);

  const filteredData = data.filter((item) => item.title[locale]);

  const onChangeData = (e) => {
    setSearch(e.title[locale].slice(0, 40));
    setUid(e.uid);
    setOpen(false);
  };

  const onChangeInput = (e) => {
    setSearch(e.target.value);
    setOpen(true);
  };

  return (
    <Box position="relative">
      <TextField
        value={search}
        onChange={(e) => onChangeInput(e)}
        label="Biriktiriladigan mahsulotni tanlang"
        fullWidth
        onClick={() => setOpen(true)}
      />
      {open ? (
        <StyledFilterBox onMouseLeave={() => setOpen(false)}>
          <Box
            height="100%"
            sx={{
              overflowY: "auto",
              "::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {filteredData.map((product) => (
              <StyledProductBox
                key={product.uid}
                display="flex"
                alignItems="center"
                minWidth="100%"
                gap={1}
                onClick={() => onChangeData(product)}
              >
                <Box
                  sx={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                  }}
                >
                  <StyledImgBox component="img" src={product?.image} />
                </Box>
                <Box>
                  <Typography
                    color="text"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      width: "300px",
                    }}
                  >
                    {product.title?.[locale]}
                  </Typography>
                </Box>
              </StyledProductBox>
            ))}
          </Box>
        </StyledFilterBox>
      ) : null}
    </Box>
  );
}
