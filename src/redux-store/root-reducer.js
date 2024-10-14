import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { reducer as formReducer } from "redux-form";
import productsPaginationReducer from "./products/pagination.slice";
import getSingleProductReducer from "./products/singleGet.slice";
import topProductsReducer from "./products/top.slice";
import mostSoldProductsReducer from "./products/most.slice";
import getByCategoryReducer from "./admin/category/byCategory.slice";
import getAllCategorySlice from "./admin/category/get.slice";
import authReducer from "./user/auth.slice";
import userProfileReducer from "./user/user.slice";
import alertReducer from "./alert/alert.slice";
import blacklistReducer from "./admin/blacklist/blacklist.slice";
import customersReducer from "./admin/customers/customers.slice";
import operatorsReducer from "./admin/operators/operator.slice";
import adminPaymentsReducer from "./admin/payment/payment.slice";
import adminOrdersReducer from "./admin/orders/orders.slice";
import adminDashboardReducer from "./admin/dashboard/dashboard.slice";
import adminProductsReducer from "./admin/products/get.slice";
import productDeleteReducer from "./admin/products/delete.slice";
import adminCreateProductReducer from "./admin/products/create.slice";
import updateProductReducer from "./admin/products/update.slice";
import updateAdminCategorySlice from "./admin/category/update.slice";
import createAdminCategory from "./admin/category/create.slice";
import createSubCategoryList from "./admin/category/createSub.slice";
import deleteCategoryReducer from "./admin/category/delete.slice";
import settingsSlice from "./settings/settings.slice";
import adminGameReducer from "./admin/game/game.slice";
import checkboxSlice from "./checkbox/checkbox.slice";
import botReducer from "./admin/message/bot.slice";
import smsReducer from "./admin/message/sms.slice";
import dashboardReducer from "./dashboard/dashboard.slice";
import commentReducer from "./admin/comments/comment.slice";
import featuresReducer from "./admin/features/features.slice";
import invoicesSlice from "./invoice/invoice.slice";
import subFeaturesReducer from "./admin/subfeatures/subfeatures.slice";
import brandsReducer from "./brands/brands.slice";
import countryReducer from "./coutry/getCountry.slice";
import siteBannerReducer from "./banners/banner.index.slice";
import metrikaReducer from "./analytics/yandex.slice";
import productSKUSlice from "./product-sku/productSKU.slice";
import updateSpamProduct from "./admin/products/updateSpam.slice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "auth", "settings", "country"],
};

const rootReducer = combineReducers({
  form: formReducer,
  productPagination: productsPaginationReducer,
  productGet: getSingleProductReducer,
  topProducts: topProductsReducer,
  mostSoldProducts: mostSoldProductsReducer,
  productsByCategory: getByCategoryReducer,
  categories: getAllCategorySlice,
  auth: authReducer,
  user: userProfileReducer,
  alert: alertReducer,
  blacklist: blacklistReducer,
  customers: customersReducer,
  operators: operatorsReducer,
  payment: adminPaymentsReducer,
  orders: adminOrdersReducer,
  statistcis: adminDashboardReducer,
  adminProducts: adminProductsReducer,
  productDelete: productDeleteReducer,
  features: featuresReducer,
  productCreate: adminCreateProductReducer,
  productUpdate: updateProductReducer,
  productSpamUpdate: updateSpamProduct,
  categoryCreate: createAdminCategory,
  subCategoryCreate: createSubCategoryList,
  categoryUpdate: updateAdminCategorySlice,
  categoryDelete: deleteCategoryReducer,
  settings: settingsSlice,
  game: adminGameReducer,
  checkbox: checkboxSlice,
  bot: botReducer,
  sms: smsReducer,
  dashboard: dashboardReducer,
  comments: commentReducer,
  invoice: invoicesSlice,
  subfeatures: subFeaturesReducer,
  banners: siteBannerReducer,
  brands: brandsReducer,
  country: countryReducer,
  metrika: metrikaReducer,
  sku: productSKUSlice,
});

export default persistReducer(persistConfig, rootReducer);
