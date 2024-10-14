import { useEffect, useMemo, useRef, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ChartBar as ChartBarIcon } from "../../icons/chart-bar";
import { ChartPie as ChartPieIcon } from "../../icons/chart-pie";
import { CreditCard as CreditCardIcon } from "../../icons/credit-card";
import { Home as HomeIcon } from "../../icons/home";
import { ReceiptTax as ReceiptTaxIcon } from "../../icons/receipt-tax";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import { Selector as SelectorIcon } from "../../icons/selector";
import { ShoppingBag as ShoppingBagIcon } from "../../icons/shopping-bag";
import { ShoppingCart as ShoppingCartIcon } from "../../icons/shopping-cart";
import { Truck as TruckIcon } from "../../icons/truck";
import { UserCircle as UserCircleIcon } from "../../icons/user-circle";
import { Users as UsersIcon } from "../../icons/users";
import { Logo } from "../logo";
import { Scrollbar } from "../scrollbar";
import { DashboardSidebarSection } from "./dashboard-sidebar-section";
import { OrganizationPopover } from "./organization-popover";
import AppBlockingIcon from "@mui/icons-material/AppBlocking";
import SettingsIcon from "@mui/icons-material/Settings";
import { useSelector } from "react-redux";
import SecurityIcon from "@mui/icons-material/Security";
import MonitorIcon from "@mui/icons-material/Monitor";

const getSections = (t) => [
  {
    title: t("Umumiy bo'lim"),
    items: [
      {
        title: t("Dashboard"),
        path: "/dashboard",
        icon: <HomeIcon fontSize="small" />,
      },
      {
        title: t("Statistika"),
        path: "/dashboard/analytics",
        icon: <ChartBarIcon fontSize="small" />,
      },
      {
        title: t("Moliyaviy bo'lim"),
        path: "/dashboard/finance",
        icon: <ChartPieIcon fontSize="small" />,
      },
      {
        title: t("Logistika"),
        path: "/dashboard/logistics",
        icon: <TruckIcon fontSize="small" />,
        chip: (
          <Chip
            color="secondary"
            label={
              <Typography
                sx={{
                  fontSize: "10px",
                  fontWeight: "600",
                }}
              >
                {t("yangi")}
              </Typography>
            }
            size="small"
          />
        ),
      },
      {
        title: t("Mahsulotlar"),
        path: "/dashboard/products",
        icon: <ShoppingBagIcon fontSize="small" />,
        children: [
          {
            title: t("Mahsulotlar ro'yhati"),
            path: "/dashboard/products/products-list?page=1&limit=7",
          },
          {
            title: t("Kategoriyalar"),
            path: "/dashboard/products/categories?page=1&limit=7",
          },
          {
            title: t("Hususiyatlar"),
            path: "/dashboard/products/features?page=1?limit=7",
          },
          {
            title: t("Brendlar to'plami"),
            path: "/dashboard/products/brands?page=1?limit=7",
          },
        ],
      },
      {
        title: t("Buyurtmalar"),
        icon: <ShoppingCartIcon fontSize="small" />,
        path: "/dashboard/orders",
        children: [
          {
            title: t("Buyurtmalar ro'yhati"),
            path: "/dashboard/orders/orders-list?page=1&limit=7&status=new",
          },
        ],
      },
      {
        title: t("Cheklar"),
        path: `/dashboard/invoices`,
        icon: <ReceiptTaxIcon fontSize="small" />,
        children: [
          {
            title: t("Buyurtmalar cheki"),
            path: "/dashboard/invoices/orders-invoice?page=1&limit=7&status=new",
          },
          // {
          //   title: t("Details"),
          //   path: "/dashboard/invoices/1",
          // },
        ],
      },
      {
        title: t("Konkurs"),
        path: "/dashboard/game",
        icon: <CardGiftcardIcon fontSize="small" />,
      },
      {
        title: t("Foydalanuvchilar"),
        path: "/dashboard/users",
        icon: <UsersIcon fontSize="small" />,
        children: [
          {
            title: t("Adminlar"),
            path: "/dashboard/users/customers?page=1&limit=7",
          },
          {
            title: t("Operatorlar"),
            path: "/dashboard/users/operators?page=1&limit=7",
          },
          {
            title: t("Kuryerlar"),
            path: "/dashboard/users/carriers",
          },
          // {
          //   title: t('Details'),
          //   path: '/dashboard/customers/1'
          // },
          // {
          //   title: t('Edit'),
          //   path: '/dashboard/customers/1/edit'
          // }
        ],
      },
      {
        title: t("Qora ro'yhat"),
        path: "/dashboard/blacklist/1",
        icon: <AppBlockingIcon fontSize="small" />,
      },
      {
        title: t("To'lovlar"),
        path: `/dashboard/payment/?page=1&limit=7&from=1640977200000=${new Date().getTime()}&status=all`,
        icon: <CreditCardIcon fontSize="small" />,
      },
      // {
      //   title: "Chat",
      //   path: "/dashboard/chat",
      //   icon: <ChatAlt2Icon fontSize="small" />,
      // },
    ],
  },
  {
    title: t("Sayt"),
    items: [
      {
        title: t("Sozlamalar"),
        path: "/dashboard/settings",
        icon: <SettingsIcon fontSize="small" />,
      },
      {
        title: t("Sayt banneri"),
        path: "/dashboard/display-settings",
        icon: <MonitorIcon fontSize="small" />,
      },
      {
        title: t("Kiber xavfsizlik"),
        path: "/dashboard/cyber-security",
        icon: <SecurityIcon fontSize="small" />,
      },
      {
        title: t("Mening profilim"),
        path: "/dashboard/account",
        icon: <UserCircleIcon fontSize="small" />,
      },
    ],
  },
  // {
  //   title: t("Platforms"),
  //   items: [
  //     {
  //       title: t("Job Listings"),
  //       path: "/dashboard/jobs",
  //       icon: <OfficeBuildingIcon fontSize="small" />,
  //       children: [
  //         {
  //           title: t("Browse"),
  //           path: "/dashboard/jobs",
  //         },
  //         {
  //           title: t("Details"),
  //           path: "/dashboard/jobs/companies/1",
  //         },
  //         {
  //           title: t("Create"),
  //           path: "/dashboard/jobs/new",
  //         },
  //       ],
  //     },
  //     {
  //       title: t("Social Media"),
  //       path: "/dashboard/social",
  //       icon: <ShareIcon fontSize="small" />,
  //       children: [
  //         {
  //           title: t("Profile"),
  //           path: "/dashboard/social/profile",
  //         },
  //         {
  //           title: t("Feed"),
  //           path: "/dashboard/social/feed",
  //         },
  //       ],
  //     },
  //     {
  //       title: t("Blog"),
  //       path: "/blog",
  //       icon: <NewspaperIcon fontSize="small" />,
  //       children: [
  //         {
  //           title: t("Post List"),
  //           path: "/blog",
  //         },
  //         {
  //           title: t("Post Details"),
  //           path: "/blog/1",
  //         },
  //         {
  //           title: t("Post Create"),
  //           path: "/blog/new",
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   title: t("Apps"),
  //   items: [
  //     {
  //       title: t("Kanban"),
  //       path: "/dashboard/kanban",
  //       icon: <ClipboardListIcon fontSize="small" />,
  //     },
  //     {
  //       title: t("Mail"),
  //       path: "/dashboard/mail",
  //       icon: <MailIcon fontSize="small" />,
  //     },
  //     {
  //       title: t("Chat"),
  //       path: "/dashboard/chat",
  //       icon: <ChatAlt2Icon fontSize="small" />,
  //     },
  //     {
  //       title: t("Calendar"),
  //       path: "/dashboard/calendar",
  //       icon: <CalendarIcon fontSize="small" />,
  //     },
  //   ],
  // },
  // {
  //   title: t("Pages"),
  //   items: [
  //     {
  //       title: t("Auth"),
  //       path: "/authentication",
  //       icon: <LockClosedIcon fontSize="small" />,
  //       children: [
  //         {
  //           title: t("Register"),
  //           path: "/authentication/register?disableGuard=true",
  //         },
  //         {
  //           title: t("Login"),
  //           path: "/authentication/login?disableGuard=true",
  //         },
  //       ],
  //     },
  //     {
  //       title: t("Pricing"),
  //       path: "/dashboard/pricing",
  //       icon: <CreditCardIcon fontSize="small" />,
  //     },
  //     {
  //       title: t("Checkout"),
  //       path: "/checkout",
  //       icon: <CashIcon fontSize="small" />,
  //     },
  //     {
  //       title: t("Contact"),
  //       path: "/contact",
  //       icon: <MailOpenIcon fontSize="small" />,
  //     },
  //     {
  //       title: t("Error"),
  //       path: "/error",
  //       icon: <XCircleIcon fontSize="small" />,
  //       children: [
  //         {
  //           title: "401",
  //           path: "/401",
  //         },
  //         {
  //           title: "404",
  //           path: "/404",
  //         },
  //         {
  //           title: "500",
  //           path: "/500",
  //         },
  //       ],
  //     },
  //   ],
  // },
];

export const DashboardSidebar = (props) => {
  const { onClose, open } = props;
  const router = useRouter();
  const { t } = useTranslation();
  const site_url = useSelector((state) => state.settings.site_name);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    noSsr: true,
  });
  const sections = useMemo(() => getSections(t), [t]);
  const organizationsRef = useRef(null);
  const [openOrganizationsPopover, setOpenOrganizationsPopover] =
    useState(false);

  const handlePathChange = () => {
    if (!router.isReady) {
      return;
    }

    if (open) {
      onClose?.();
    }
  };

  useEffect(
    handlePathChange,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady, router.asPath]
  );

  const handleCloseOrganizationsPopover = () => {
    setOpenOrganizationsPopover(false);
  };

  const content = (
    <>
      <Scrollbar
        sx={{
          height: "100%",
          "& .simplebar-content": {
            height: "100%",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div>
            <Box sx={{ p: 3 }}>
              <NextLink href="/" passHref>
                <a>
                  <Logo
                    sx={{
                      height: 42,
                      width: 42,
                    }}
                  />
                </a>
              </NextLink>
            </Box>
            <Box sx={{ px: 2 }}>
              <Box
                sx={{
                  alignItems: "center",
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  px: 3,
                  py: "11px",
                  borderRadius: 1,
                }}
              >
                <div>
                  <Typography color="inherit" variant="subtitle1">
                    VIPCRM
                  </Typography>
                  <Typography color="neutral.400" variant="body2">
                    {t("Obuna turi")} : {t("Premium")}
                  </Typography>
                </div>
                <SelectorIcon
                  sx={{
                    color: "neutral.500",
                    width: 14,
                    height: 14,
                  }}
                />
              </Box>
            </Box>
          </div>
          <Divider
            sx={{
              borderColor: "#2D3748",
              my: 3,
            }}
          />
          <Box sx={{ flexGrow: 1 }}>
            {sections.map((section) => (
              <DashboardSidebarSection
                key={section.title}
                path={router.pathname}
                sx={{
                  mt: 2,
                  "& + &": {
                    mt: 2,
                  },
                }}
                {...section}
              />
            ))}
          </Box>
          <Divider
            sx={{
              borderColor: "#2D3748", // dark divider
            }}
          />
          <Box sx={{ p: 2 }}>
            <Typography color="neutral.100" variant="subtitle2">
              {t("Sotuvchi sayt manzili")}
            </Typography>
            <NextLink href={`https://${site_url}.uz`} passHref>
              <Button
                color="secondary"
                component="a"
                fullWidth
                sx={{ mt: 2 }}
                variant="contained"
              >
                {t("Saytga o'tish")}
              </Button>
            </NextLink>
          </Box>
        </Box>
      </Scrollbar>
      <OrganizationPopover
        anchorEl={organizationsRef.current}
        onClose={handleCloseOrganizationsPopover}
        open={openOrganizationsPopover}
      />
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            borderRightColor: "divider",
            borderRightStyle: "solid",
            borderRightWidth: (theme) =>
              theme.palette.mode === "dark" ? 1 : 0,
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
