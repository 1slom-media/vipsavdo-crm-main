import AdminCard from "components/general/Cards/AdminCard";
import SKUTableHead from "components/admin/TableRows/SKUTableHead";
import SkuTableRow from "components/admin/TableRows/SKUTableRow";
import {
  Grid,
  InputAdornment,
  Stack,
  Table,
  TableContainer,
  TextField,
  Typography,
} from "@mui/material";

const SKUUpdateForm = ({ input: { value, onChange } }) => {
  return (
    <>
      <Stack>
        <AdminCard>
          <Stack>
            <Typography variant="h5">SKU shakillanishi</Typography>
          </Stack>
          <Stack width={{ xs: "100%", md: "70%" }} mt={2}>
            <Typography
              variant="body1"
              sx={{ fontSize: "14px" }}
              fontWeight={400}
            >
              SKU – ingliz tilida Stock Keeping Unit (tovar elementi
              identifikatori) – zaxiralarni hisobga olish birligi. Har bir
              mumkin boʻlgan tovar varianti uchun SKU tayinlanadi. Misol uchun,
              sizning tovaringiz “Palto” va u ikkita rangda – qora va oq,
              shuningdek, uchta oʻlchamga – S, M va L oʻlchamlarida mavjud.
              Shunda bu mahsulot oltita SKUga ega boʻladi – qora S, qora M, qora
              L, oq S, oq M va oq L.
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: "14px" }}
              fontWeight={400}
            >
              SKU nomi doʻkon identifikatori, mahsulot identifikatori va
              xususiyat identifikatoridan (agar mavjud boʻlsa) iborat.
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: "14px" }}
              fontWeight={400}
            >
              Quyida tovar va uning tavsiflari uchun <strong>noyob</strong> SKU
              belgilarini kiritganingizga <b>ishonch hosil qiling</b>.
            </Typography>
          </Stack>
          <Stack mt={2}>
            <Grid container>
              <Grid item xs={12} md={4}>
                <Typography variant="h6">Tovar nomi uchun SKU</Typography>
                <Stack mt={2}>
                  <TextField
                    onChange={(e) => {
                      if (e.target?.value?.length <= 7) {
                        onChange({
                          ...value,
                          productSku: e.target.value?.toUpperCase(),
                        });
                      }
                    }}
                    value={value?.productSku}
                    size="small"
                    placeholder="SKU"
                    max={7}
                    min={3}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <Typography>
                            {value?.productSku?.length
                              ? value?.productSku?.length
                              : 0}
                            /7
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </AdminCard>
      </Stack>
      <Stack mt={4}>
        <AdminCard sx={{ p: 0 }}>
          <TableContainer>
            <Table>
              <SKUTableHead handleChange={onChange} formData={value} />
              {value?.skuList?.map((sku, indx) => (
                <SkuTableRow
                  handleChange={onChange}
                  formData={value}
                  key={indx}
                  {...sku}
                />
              ))}
            </Table>
          </TableContainer>
        </AdminCard>
      </Stack>
    </>
  );
};

export default SKUUpdateForm;
