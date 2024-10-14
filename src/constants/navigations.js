import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import CreditCardIcon from "@mui/icons-material/CreditCard";

import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";

import LockIcon from "@mui/icons-material/Lock";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SettingsIcon from "@mui/icons-material/Settings";

export const customerNavigations = [
  {
    _id: 2019,
    href: "/dashboard/users/customers/profile/",
    outlined: AccountCircleOutlinedIcon,
    contained: AccountCircleIcon,
    pageParams: false,
    label: "Shaxsiy malumotlar",
  },
  {
    _id: 2021,
    href: "/dashboard/users/customers/payment/",
    outlined: CreditCardIcon,
    contained: CreditCardIcon,
    pageParams: true,
    isNew: false,
    label: "To'lovlar",
  },
  {
    _id: 2020,
    href: "/dashboard/users/customers/orders/",
    outlined: ShoppingBasketOutlinedIcon,
    contained: ShoppingBasketIcon,
    isNew: true,
    pageParams: true,
    label: "Buyurtmalar",
  },
  //   {
  //     _id: 2022,
  //     href: "/dashboard/users/customers/password/",
  //     outlined: LockOutlinedIcon,
  //     contained: LockIcon,
  //     pageParams: false,
  //     label: "Parolni yangilash",
  //   },
  {
    _id: 2023,
    href: "/dashboard/users/customers/settings/",
    outlined: SettingsOutlinedIcon,
    contained: SettingsIcon,
    pageParams: false,
    label: "Sozlamalar",
  },
];

export const operatorNavigations = [
  {
    _id: 2019,
    href: "/dashboard/users/operators/profile/",
    outlined: AccountCircleOutlinedIcon,
    contained: AccountCircleIcon,
    pageParams: false,
    label: "Shaxsiy malumotlar",
  },
  {
    _id: 2021,
    href: "/dashboard/users/operators/payment/",
    outlined: CreditCardIcon,
    contained: CreditCardIcon,
    pageParams: true,
    isNew: false,
    label: "To'lovlar",
  },
  {
    _id: 2020,
    href: "/dashboard/users/operators/orders/",
    outlined: ShoppingBasketOutlinedIcon,
    contained: ShoppingBasketIcon,
    pageParams: true,
    isNew: true,
    label: "Buyurtmalar",
  },
  // {
  //     _id: 2022,
  //     href: "/dashboard/users/operators/password/",
  //     outlined: LockOutlinedIcon,
  //     contained: LockIcon,
  //     pageParams: false,
  //     label: "Parolni yangilash",
  // },
  {
    _id: 2023,
    href: "/dashboard/users/operators/settings/",
    outlined: SettingsOutlinedIcon,
    contained: SettingsIcon,
    pageParams: false,
    label: "Sozlamalar",
  },
];
