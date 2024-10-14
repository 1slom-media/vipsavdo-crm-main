import {
  Alert,
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import SkuSelect from "./SKUSelect";
import { useState } from "react";
import { Delete } from "@mui/icons-material";
import { Plus } from "icons/plus";
import { MinusOutlined } from "icons/minus-outlined";

const ProductSelectRow = ({
  image,
  title,
  uid,
  isEdit,
  characteristics,
  skuList,
  value,
  onChange,
  variant,
  handleClose,
}) => {
  const router = useRouter();
  const [selectedSkus, setSku] = useState([]);
  const [selectedSkuId, setSkuId] = useState(null);
  const selectedVariant = isEdit
    ? skuList?.find((item) => item?.uid === parseInt(variant?.variantId))
    : skuList?.find((item) => item?.uid === parseInt(selectedSkuId));

  const handleAddProduct = () => {
    const isExist = value?.find(
      (item) => item?.variantId === selectedVariant?.uid
    );
    if (!isExist && selectedVariant) {
      onChange([
        ...value,
        {
          variantId: selectedVariant?.uid,
          product: { skuList, characteristics, image, title, uid },
          quantity: 1,
          price: selectedVariant?.purchasePrice,
        },
      ]);
      handleClose();
    }

    if (isExist && selectedVariant) {
      const copyArray = [...value];
      const indx = copyArray?.findIndex(
        (item) => item?.variantId === selectedVariant?.uid
      );
      copyArray[indx]["quantity"] += 1;
      onChange(copyArray);
      handleClose();
    }
  };

  const handleRemoveProduct = () => {
    if (variant) {
      const filtered = value?.filter(
        (each) => each?.variantId !== variant?.variantId
      );
      onChange(filtered);
    }
  };

  const handleIncreaseAmount = () => {
    const copyArray = value.map((item) => {
      if (item?.variantId === variant?.variantId) {
        return {
          ...item,
          quantity: item?.quantity + 1,
        };
      }

      return item;
    });

    onChange(copyArray);
  };
  const handleDecreaseAmount = () => {
    const copyArray = value.map((item) => {
      if (item?.variantId === variant?.variantId) {
        return {
          ...item,
          quantity: item?.quantity - 1,
        };
      }

      return item;
    });

    onChange(copyArray);
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="start"
      px={2}
    >
      <Stack gap={2} direction="row">
        <Box
          width={260}
          height={320}
          component={"img"}
          sx={{ borderRadius: "4px" }}
          src={image}
          alt="image"
        />
        <Stack>
          <Stack>
            <Typography>{title[router?.locale]}</Typography>
            <Typography color="success.main">#{uid}</Typography>
          </Stack>
          <Stack>
            {isEdit ? (
              <Stack mt={2}>
                <Typography color="primary" variant="h6">
                  Tanlangan xususiyat:
                </Typography>
                <Typography variant="string">
                  {selectedVariant?.characteristicsTitle}
                </Typography>
              </Stack>
            ) : (
              characteristics?.map((item) => (
                <Stack key={item?.uid} gap="10px" mt={2}>
                  <Typography>{item?.title[router?.locale]}</Typography>
                  <SkuSelect
                    list={item?.values}
                    selectSKU={setSku}
                    selectedSkus={selectedSkus}
                    selectedSkuId={selectedSkuId}
                    charLength={characteristics?.length}
                    skuList={skuList}
                    setSkuId={setSkuId}
                  />
                </Stack>
              ))
            )}

            {!selectedVariant && !isEdit ? (
              <Stack mt={2}>
                <Alert severity="warning">
                  iltimos qushish uchun mahsulot turini tanlang
                </Alert>
              </Stack>
            ) : null}
            {isEdit ? (
              <Stack mt={2}>
                <Stack mb={2}>
                  <Typography variant="h6" color="primary">
                    Mahsulot narxi:
                  </Typography>
                  <Typography variant="string">
                    {(variant?.quantity * variant?.price)?.toLocaleString()}{" "}
                    so&apos;m
                  </Typography>
                </Stack>
                <Stack>
                  <Typography variant="h6" color="primary">
                    Buyurtma soni:
                  </Typography>
                  <Stack mt={1} direction="row" alignItems="center" gap="5px">
                    <IconButton
                      onClick={handleIncreaseAmount}
                      disabled={
                        variant?.quantity === selectedVariant?.availableAmount
                      }
                      sx={{ borderRadius: "50%" }}
                    >
                      <Plus />
                    </IconButton>
                    <TextField
                      value={variant?.quantity}
                      size="small"
                      sx={{ width: 100 }}
                    />
                    <IconButton
                      onClick={handleDecreaseAmount}
                      disabled={variant?.quantity === 1}
                      sx={{ borderRadius: "50%" }}
                    >
                      <MinusOutlined />
                    </IconButton>
                  </Stack>
                </Stack>
              </Stack>
            ) : null}
          </Stack>
        </Stack>
      </Stack>
      {!isEdit ? (
        <Button
          onClick={handleAddProduct}
          disabled={!selectedVariant}
          variant="contained"
        >
          Mahsulotni qo&apos;shish
        </Button>
      ) : (
        <IconButton
          sx={{ borderRadius: "50%" }}
          color="error"
          onClick={handleRemoveProduct}
          disabled={value?.length === 1}
        >
          <Delete />
        </IconButton>
      )}
    </Stack>
  );
};

export default ProductSelectRow;
