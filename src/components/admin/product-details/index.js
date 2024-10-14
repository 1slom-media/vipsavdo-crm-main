import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ReactHtmlParser from "react-html-parser";
import CommentItem from "./ProductComment";
import { Stack } from "@mui/system";
import { Button, Grid, Rating } from "@mui/material";
import CommentProgress from "./CommentProgress";
import { useDispatch, useSelector } from "react-redux";
import { getCommentList } from "redux-store/admin/comments/comment.slice";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ProductDetails = ({ description }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation("translation");

  const id = router?.query?.id;
  const commentList = useSelector((state) => state.comments.list);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    dispatch(getCommentList({ id }));
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label={t("Information")} {...a11yProps(0)} />
          <Tab label={t("Comments")} {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Typography sx={{ "& p": { margin: 0, padding: 0 }, my: 2 }}>
          {ReactHtmlParser(description)}
        </Typography>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Stack my={3}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Stack alignItems="center" justifyContent="center" height="100%">
                <Stack alignItems="center">
                  <Typography variant="body1">{t("MidRating")}</Typography>
                  <Typography
                    my={2}
                    variant="h5"
                    color="success.main"
                    component="h6"
                  >
                    4.5/5
                  </Typography>
                  <Stack direction="row" alignItems="center" gap="10px">
                    <Rating value={5} />
                    <Typography variant="string">(134.9)</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={5}>
              <Stack>
                <CommentProgress order={1} />
                <CommentProgress order={2} />
                <CommentProgress order={3} />
                <CommentProgress order={4} />
                <CommentProgress order={5} />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Stack
                alignItems="flex-end"
                height="100%"
                justifyContent="center"
              >
                <Button variant="outlined">{t("LeaveComment")}</Button>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
        <Stack my={6}>
          {commentList.map((item) => {
            return (
              <CommentItem
                photo={item?.images}
                date={item?.date}
                text={item?.text}
                name={item?.user}
                key={item?._id}
                rating={item?.rating}
              />
            );
          })}
        </Stack>
      </CustomTabPanel>
    </Box>
  );
};

export default ProductDetails;
