import DoneAllIcon from "@mui/icons-material/DoneAll";
import {
  Button,
  Grid,
  MenuItem,
  Stack,
  Select,
  OutlinedInput,
  Checkbox,
  FormControl,
  ListItemText,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Chip,
  IconButton,
  Typography,
  Divider,
  styled,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import EmptyCard from "components/general/ErrorBoundry/EmptyCard";
import CloseIcon from "components/icons/CloseIcon";
import { StyledIconBtn } from "../Modals/ConfirmUserStatusChange";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxHeight: "500px",
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "10px",
  boxShadow: 24,
  padding: "0px !important",
  overflow: "hidden",
};

const FeaturesSelectRow = ({ value, input, feature, meta }) => {
  const router = useRouter();
  const { t } = useTranslation("translation");

  const features = useSelector((state) => state.features.list);
  const subFeatures = features?.find((item) => item.uid == feature.uid)?.values;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    const filteredfetas = input?.value?.filter(
      (item) => item.uid !== feature.uid
    );
    input.onChange(filteredfetas);
  };

  const handleSubFeatureDelete = (value) => {
    const filteredfetas = input?.value?.filter(
      (item) => item.uid !== feature.uid
    );
    const newFetaList = feature?.values?.filter(
      (item) => item.uid !== value.uid
    );
    const updatedFeature = { ...feature, values: newFetaList };
    input.onChange([...filteredfetas, updatedFeature]);
  };

  const handleChange = (value) => {
    const filteredfetas = input?.value?.filter(
      (item) => item.uid !== feature.uid
    );
    let newFetaList = [];
    const findIfExist = feature?.values?.find((item) => item.uid === value.uid);
    if (findIfExist) {
      newFetaList = feature?.values?.filter((item) => item.uid !== value.uid);
    } else {
      newFetaList = [...feature?.values, value];
    }
    const updatedFeature = { ...feature, values: newFetaList };
    input.onChange([...filteredfetas, updatedFeature]);
  };

  return (
    <Stack>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Button
              onClick={handleOpen}
              startIcon={<DoneAllIcon />}
              variant="outlined"
            >
              {t("TypeChar")} /{" "}
              {feature?.title ? feature?.title[router?.locale] : null}
            </Button>
            <IconButton onClick={handleDelete} color="error">
              <DeleteIcon />
            </IconButton>
          </Stack>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Box
                p={2}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography>{t("SelectProdInChar")} </Typography>
                <StyledIconBtn onClick={handleClose}>
                  <CloseIcon />
                </StyledIconBtn>
              </Box>
              <Divider />
              {subFeatures?.length > 0 ? (
                <List
                  sx={{
                    padding: "0px !important",
                    maxHeight: "400px",
                    overflowY: " scroll",
                    scrollbarWidth: "none",
                    "::-webkit-scrollbar": {
                      display: "none",
                    },
                  }}
                >
                  {subFeatures.map((feta) => {
                    const isInsideFeta = feature?.values?.find(
                      (item) => item.uid === feta.uid
                    )
                      ? true
                      : false;
                    return (
                      <ListItem key={feta.uid} disablePadding>
                        <ListItemButton
                          onClick={() => handleChange(feta)}
                          selected={isInsideFeta}
                        >
                          <ListItemIcon>
                            <Checkbox checked={isInsideFeta} />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              feta?.title ? feta?.title[router?.locale] : null
                            }
                          />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              ) : (
                <EmptyCard
                  txt={t("NoProdInChar")}
                  img="/assets/media/noBlackList.png"
                />
              )}
            </Box>
          </Modal>
        </Grid>

        <Grid container item xs={12} spacing={2}>
          {feature?.values?.map((item) => {
            return (
              <Grid item key={item.uid}>
                <Chip
                  variant="outlined"
                  color="warning"
                  label={item?.title ? item?.title[router?.locale] : null}
                  onDelete={() => handleSubFeatureDelete(item)}
                  icon={
                    item.isColor && (
                      <Box
                        width="20px"
                        height="20px"
                        borderRadius="50%"
                        bgcolor={item.value}
                      ></Box>
                    )
                  }
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Stack>
  );
};

export default FeaturesSelectRow;
