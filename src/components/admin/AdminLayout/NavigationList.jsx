import DashboardOutlined from "components/icons/DashboardOutlined";
import ListingOutlined from "components/icons/ListingOutlined";
import ShoppingOutlined from "components/icons/ShoppingOutlined";
import PhoneCanceled from "components/icons/PhoneCanceled";
import GameOutlined from "components/icons/GameOutlined";
import UsersOutlined from "components/icons/UsersOutlined";
import HeadSetIcon from "components/icons/HeadsetIcon";
import WalletOutlined from "components/icons/WalletOutlined";
import SettingsOutlined from "components/icons/SettingsIcon";
import HomeOutlined from "components/icons/HomeOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

export const navigations = [
  {
    name: "MainPage",
    icon: HomeOutlined,
    path: "/admin/dashboard",
  },
  {
    name: "Mahsulotlar",
    icon: ListingOutlined,
    path: "/admin/products-list",
  },
  {
    name: "Kategoriyalar",
    icon: DashboardOutlined,
    path: "/admin/categories",
  },
  {
    name: "Buyurtmalar",
    icon: ShoppingOutlined,
    path: "/admin/orders",
  },
  {
    name: "BlackList",
    icon: PhoneCanceled,
    path: "/admin/blacklist",
  },
  {
    name: "Konkurs",
    icon: GameOutlined,
    path: "/admin/game",
  },
  {
    name: "Adminlar",
    icon: UsersOutlined,
    path: "/admin/users",
  },
  {
    name: "Operatorlar",
    icon: HeadSetIcon,
    path: "/admin/operators",
  },
  {
    name: "To'lovlar",
    icon: WalletOutlined,
    path: "/admin/payment",
  },
  {
    name: "Chat",
    icon: EmailOutlinedIcon,
    path: "/admin/chat",
  },
  {
    name: "Sozlamalar",
    icon: SettingsOutlined,
    path: "/admin/settings",
  },
];
