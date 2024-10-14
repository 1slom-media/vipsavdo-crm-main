export const getCity = (city_id) => {
  switch (city_id) {
    case 0:
      return "Viloyat kiritilmagan!";
    case 1:
      return "Toshkent";

    case 2:
      return "Samarqand";

    case 3:
      return "Qashqadaryo";

    case 4:
      return "Jizzax";

    case 5:
      return "Sirdaryo";

    case 6:
      return "Farg'ona";

    case 7:
      return "Namangan";

    case 8:
      return "Andijon";

    case 9:
      return "Surxondaryo";

    case 10:
      return "Qoraqalpog'iston";

    case 11:
      return "Buxoro";

    case 12:
      return "Navoiy";

    case 13:
      return "Toshkent viloyati";

    case 14:
      return "Xorazm";

    default:
      return "";
  }
};

export const getColor = (status) => {
  switch (status) {
    case "all":
      return "secondary";
    case "accepted":
      return "info";
    case "new":
      return "info";
    case "ready":
      return "success";
    case "delivered":
      return "success";
    case "waiting":
      return "secondary";
    case "fulfilled":
      return "success";
    case "canceled":
      return "error";
    case "hold":
      return "warning";
    case "pending":
      return "warning";
    case "onway":
      return "blue";
    case "archived":
      return "warning";
    case "rejected":
      return "error";
    default:
      return "";
  }
};

export const getUserStatusColor = (status) => {
  switch (status) {
    case 0:
      return "error";
    case 1:
      return "success";
    default:
      return "";
  }
};

export const getStatusText = (val) => {
  switch (val) {
    case "new":
      return "Yangi";
    case "ready":
      return "Tayyor";
    case "onway":
      return "Yo'lda";
    case "delivered":
      return "Yetkazildi";
    case "canceled":
      return "Atkaz";
    case "archived":
      return "Arxivlangan";
    case "hold":
      return "Hold";
    case "accepted":
      return "Qabul qilindi";
    case "waiting":
      return "Kutilayotgan";
    case "pending":
      return "Keyin oladi";
    case "fulfilled":
      return "Yakunlangan";
    case "rejected":
      return "Bekor qilingan";
    default:
      return "Nomalum";
  }
};

export const checkStatus = (status) => {
  switch (status) {
    case "accepted":
      return "Qabul qilindi";

    case "waiting":
      return "Kutilmoqda";

    case "fulfilled":
      return "Yakunlandi";

    case "rejected":
      return "Bekor qilindi";

    default:
      return;
  }
};

export const userPaymentStatus = (status) => {
  switch (status) {
    case "accepted":
      return "Qabul qilingan so`rovlar";

    case "waiting":
      return "Kutilayotgan so`rovlar";

    case "fulfilled":
      return "Tasdiqlangan so`rovlar";

    case "rejected":
      return "Bekor qilingan so`rovlar";

    default:
      return;
  }
};

export const getTodaysNotifications = (data) => {
  const today = new Date().getDate();
  const year = new Date().getFullYear();

  const todays = data?.filter(
    (item) =>
      new Date(item.createdAt).getDate() === today &&
      new Date(item.createdAt).getFullYear() === year
  );

  return todays;
};

export const getYesterdaysNotifications = (data) => {
  const today = new Date().getDate();
  const year = new Date().getFullYear();

  const yesterday = data?.filter(
    (item) =>
      new Date(item.createdAt).getDate() === today - 1 &&
      new Date(item.createdAt).getFullYear() === year
  );

  return yesterday;
};

export const getNotificationByDay = (data) => {
  const today = new Date().getDate();
  const year = new Date().getFullYear();

  const yesterday = data?.filter(
    (item) =>
      new Date(item.createdAt).getDate() !== today - 1 &&
      new Date(item.createdAt).getFullYear() === year &&
      new Date(item.createdAt).getDate() === today
  );

  return yesterday;
};

let groups = {
  a: [1, 2, 3, 4, 5, 6],
  b: [2, 3, 4, 6, 6, 7, 8, 9],
  c: [7, 8, 6, 5, 4, 3, 2, 1],
};

export const formatNumber = (q = "") => {
  return q.toLocaleString("en-US");
};
