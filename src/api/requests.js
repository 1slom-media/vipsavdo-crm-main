import axios from "axios";
import { toast } from "react-toastify";

const server = process.env.NEXT_PUBLIC_API;

//Product related requests server
export async function getProductsPagination({ params, token }) {
  const res = await axios({
    method: "GET",
    url: `${server}/product/admin/all`,
    params: params,
    headers: { auth: token },
  });
  return res.data;
}

export async function getProductsByCategory({ uid, token, params }) {
  const res = await axios({
    method: "GET",
    url: `${server}/category/admin/${uid}`,
    headers: {
      auth: token,
    },
    params: params,
  });
  return res.data;
}

export async function getOnlyOneCategory({ uid, token }) {
  const res = await axios({
    method: "GET",
    url: `${server}/category/only/${uid}`,
    headers: {
      auth: token,
    },
  });

  return res.data;
}

export async function getParentalCategories() {
  const res = await axios({
    method: "GET",
    url: `${server}/category`,
  });

  return res.data;
}

export async function createSubCategory({
  data,
  token,
  alert,
  callback,
  uid,
  close,
}) {
  try {
    await axios({
      method: "POST",
      url: `${server}/category/add/${uid}`,
      headers: {
        auth: token,
      },
      data: data,
    });
    alert.success({ title: "Okay", text: "Mahsulot qo'shildi" });
    callback();
    close();
  } catch (error) {
    alert.error({
      title: "Ooops",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik",
    });
    return error;
  }
}

export async function getTopProducts({ token }) {
  const res = await axios({
    method: "GET",
    headers: {
      auth: token,
    },
    url: `${server}/product?page=1`,
  });
  return res.data;
}

export async function getMostSoldProducts({ token }) {
  const res = await axios({
    method: "GET",
    headers: {
      auth: token,
    },
    url: `${server}/product?page=2`,
  });
  return res.data;
}

export async function deleteProduct({ _id, token, alert, callback, close }) {
  try {
    await axios({
      method: "DELETE",
      url: `${server}/product/${_id}`,
      headers: {
        auth: token,
      },
    });
    alert.success({ title: "Okay", text: "Mahsulot o'chirildi" });
    callback();
    close();
  } catch (error) {
    alert.error({
      title: "Ooops",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik",
    });
    return error;
  }
}

export async function createProduct({ data, token, alert, callback }) {
  try {
    const res = await axios({
      method: "POST",
      url: `${server}/product`,
      headers: {
        auth: token,
      },
      data: data,
    });
    alert.success({ title: "Okay", text: "Mahsulot qo'shildi" });
    callback(res?.data);
  } catch (error) {
    console.log(error);
    alert.error({
      title: "Ooops",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik",
    });
    return error;
  }
}

export async function updateProduct({ data, uid, token, alert, callback }) {
  try {
    await axios({
      method: "PUT",
      url: `${server}/product/${uid}`,
      headers: {
        auth: token,
      },
      data: data,
    });
    alert.success({ title: "Okay", text: "Mahsulot yangilandi" });
    callback();
  } catch (error) {
    alert.error({
      title: "Ooops",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik",
    });
    return error;
  }
}

export async function getRecentPurchases({ token }) {
  try {
    const result = await axios({
      method: "GET",
      url: `${server}/product/delivered`,
      headers: {
        auth: token,
      },
    });
    const filterFirst = result?.data?.products?.filter(
      (item) => item.length !== 0
    );
    const filter = filterFirst?.map((doc) => {
      return {
        qty: doc.total,
        name: doc?.product?.name,
        image: doc?.product?.image,
        price: doc?.product?.price,
        id: doc?.product?._id,
      };
    });

    return filter;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
}

export async function getSingleProduct({ id }) {
  const res = await axios({
    method: "GET",
    url: `${server}/product/${id}`,
  });
  return res.data;
}

export async function searchProduct(payload) {
  const res = await axios({
    method: "get",
    url: `${server}/product?filter${payload}`,
  });

  return res.data;
}

//Product releated requests end

// Category related requests start

export async function getAllCategories({ token, params }) {
  const res = await axios({
    method: "get",
    url: `${server}/category/admin`,
    headers: {
      auth: token,
    },
    params,
  });

  return res.data;
}

export async function createCategory({ data, token, alert, callback, close }) {
  try {
    await axios({
      method: "POST",
      url: `${server}/category/add`,
      data: data,
      headers: {
        auth: token,
      },
    });
    alert.success({ title: "Okay", text: "Kategoriya yaratildi" });
    callback();
    close();
  } catch (error) {
    alert.error({
      title: "Ooops",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik",
    });
    close();
    return error;
  }
}

export async function updateCategory({
  data,
  uid,
  token,
  alert,
  callback,
  close,
}) {
  try {
    await axios({
      method: "PUT",
      url: `${server}/category/${uid}`,
      data: data,
      headers: {
        auth: token,
      },
    });
    alert.success({ title: "Okay", text: "Kategoriya yangilandi" });
    close();
    callback();
  } catch (error) {
    alert.error({
      title: "Ooops",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik",
    });
    close();
    return error;
  }
}

export async function deleteCategory({ uid, token, alert, callback, close }) {
  try {
    await axios({
      method: "DELETE",
      url: `${server}/category/${uid}`,
      headers: {
        auth: token,
      },
    });
    alert.success({ title: "Okay", text: "Kategoriya o'chirildi" });
    callback();
    close();
  } catch (error) {
    alert.error({
      title: "Ooops",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik",
    });
    close();
    return error;
  }
}
// features page requests
export async function getAllFeatures({ token, params }) {
  const res = await axios({
    method: "GET",
    url: `${server}/features`,
    headers: {
      auth: token,
    },
    params,
  });
  return res.data;
}

export async function getFeaturesAll({ token, params }) {
  const res = await axios({
    method: "GET",
    url: `${server}/features/all`,
    headers: {
      auth: token,
    },
    params,
  });
  return res.data;
}

export async function createFeature({ data, token, alert, callback, close }) {
  try {
    await axios({
      method: "POST",
      url: `${server}/features`,
      data: data,
      headers: {
        auth: token,
      },
    });
    alert.success({ title: "Okay", text: "Hususiyat yaratildi" });
    callback();
    close();
  } catch (error) {
    alert.error({
      title: "Ooops",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik",
    });
    close();
    return error;
  }
}

export async function deleteFeature({ uid, token, alert, callback, close }) {
  try {
    await axios({
      method: "DELETE",
      url: `${server}/features/${uid}`,
      headers: {
        auth: token,
      },
    });
    alert.success({ title: "Okay", text: "Hususiyat o'chirildi" });
    callback();
    close();
  } catch (error) {
    alert.error({
      title: "Ooops",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik",
    });
    close();
    return error;
  }
}

export async function updateFeatureByUid({
  uid,
  data,
  token,
  alert,
  callback,
  close,
}) {
  try {
    await axios({
      method: "PUT",
      url: `${server}/features/${uid}`,
      data: data,
      headers: {
        auth: token,
      },
    });
    alert.success({ title: "Okay", text: "Hususiyat yangilandi" });
    callback();
    close();
  } catch (error) {
    alert.error({
      title: "Ooops",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik",
    });
    close();
    return error;
  }
}

// sub features reqs

export async function getAllSubFeatures({ token, params }) {
  const res = await axios({
    method: "GET",
    url: `${server}/subfeatures/${params.id}`,
    headers: {
      auth: token,
    },
    params,
  });
  return res.data;
}

export async function deleteSubFeature({ uid, token, alert, callback, close }) {
  try {
    await axios({
      method: "DELETE",
      url: `${server}/subfeatures/${uid}`,
      headers: {
        auth: token,
      },
    });
    alert.success({ title: "Okay", text: "Hususiyat o'chirildi" });
    callback();
    close();
  } catch (error) {
    alert.error({
      title: "Ooops",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik",
    });
    close();
    return error;
  }
}

export async function updateSubFeatureByUid({
  uid,
  data,
  token,
  alert,
  callback,
  close,
}) {
  try {
    await axios({
      method: "PUT",
      url: `${server}/subfeatures/${uid}`,
      data: data,
      headers: {
        auth: token,
      },
    });
    alert.success({ title: "Okay", text: "Hususiyat yangilandi" });
    callback();
    close();
  } catch (error) {
    alert.error({
      title: "Ooops",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik",
    });
    close();
    return error;
  }
}

export async function createSubFeature({
  data,
  token,
  alert,
  callback,
  close,
}) {
  try {
    await axios({
      method: "POST",
      url: `${server}/subfeatures`,
      data: data,
      headers: {
        auth: token,
      },
    });
    alert.success({ title: "Okay", text: "Hususiyat yaratildi" });
    callback();
    close();
  } catch (error) {
    alert.error({
      title: "Ooops",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik",
    });
    close();
    return error;
  }
}
// Category related requests end

// Profile related requests start alert

export async function sendSMSCode({ data, alert, router }) {
  try {
    const res = await axios({
      method: "POST",
      url: `${server}/user/admin/login`,
      data: data,
    });
    router.push("/authentication/verify-code");
    return res.data;
  } catch (error) {
    alert.error({
      title: "Ooops",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik",
    });
    return error;
  }
}

export async function confirmOTPCode({ data, alert }) {
  try {
    const res = await axios({
      method: "POST",
      url: `${server}/user/check/phone`,
      data: data,
    });
    return res.data;
  } catch (error) {
    alert.error({
      title: "Ooops",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik",
    });
    return error;
  }
}

export async function getUserProfile({ token }) {
  const res = await axios({
    method: "get",
    url: `${server}/user/profile`,
    headers: {
      auth: token,
    },
  });

  return res.data;
}

export async function editUserProfile({ token, data, callback, alert }) {
  try {
    const res = await axios({
      method: "put",
      url: `${server}/user/profile`,
      headers: {
        auth: token,
      },
      data,
    });
    alert.success({ title: "Okay", text: "Profil yangilandi!" });
    callback();
    return res.data;
  } catch (error) {
    console.log("error desc", error);
    // alert.error({
    //   title: "Ooops",
    //   text: error?.response?.data?.message
    //     ? error?.response?.data?.message
    //     : "Nomalum xatolik",
    // });
    return error;
  }
}

// Profile related requests ends

// profile streams requests start
export async function createStream({ token, data, callback }) {
  const res = await axios({
    method: "POST",
    url: `${server}/stream`,
    data: data,
    headers: {
      auth: token,
    },
  });
  callback();
  return res.data;
}

export async function deleteStream(payload) {
  const res = await axios({
    method: "delete",
    url: `${server}/stream/${payload._id}`,
    headers: {
      auth: payload.token,
    },
  });

  payload.callBack();

  return res.data;
}

export async function getAllUserStreams(payload) {
  const res = await axios({
    method: "get",
    url: `${server}/stream/all`,
    headers: {
      auth: payload,
    },
  });

  return res.data;
}
// profile streams requests end
// user statistics start

export async function getUserStatistics(token) {
  const res = await axios({
    method: "GET",
    url: `${server}/stream`,
    headers: {
      auth: token,
    },
  });
  return res.data;
}

export async function getStreamDetails({ id, token }) {
  try {
    const streamDetail = await axios({
      url: `${server}/stream/details/${id}`,
      method: "get",
      headers: {
        auth: token,
      },
    });
    return streamDetail.data;
  } catch (error) {
    console.log(error?.response);
  }
}

// User requests

export async function getUserRequestsAsync(token) {
  const res = await axios({
    method: "GET",
    url: `${server}/request`,
    headers: {
      auth: token,
    },
  });
  return res.data;
}

// konkurs uchun start

export async function getUserGame({ token }) {
  const res = await axios({
    method: "GET",
    url: `${server}/konkurs`,
    headers: {
      auth: token,
    },
  });
  return res.data;
}

export async function getUserGameById({ token, id }) {
  const res = await axios({
    method: "GET",
    url: `${server}/konkurs/${id}`,
    headers: {
      auth: token,
    },
  });
  return res.data;
}

export async function postDataGame({ token, data, alert, callBack }) {
  const res = await axios({
    method: "POST",
    url: `${server}/konkurs`,
    headers: {
      auth: token,
    },
    data,
  });

  if (res.status === 200 || res.status === 201) {
    alert.success({ title: "Konkurs", text: "Muvaffaqiyatli yangilandi!" });
    callBack();
  } else {
    alert.error({ title: "Konkurs", text: "Xatolik yuz berdi!" });
  }

  return res.data;
}

export async function putGameData({ token, data, alert, callBack, id }) {
  try {
    const res = await axios({
      method: "PUT",
      url: `${server}/konkurs/${id}`,
      headers: {
        auth: token,
      },
      data,
    });
    alert.success({ title: "Konkurs", text: "Muvaffaqiyatli o'zgartirildi!" });
    callBack();
    return res.data;
  } catch (error) {
    alert.error({
      title: "Konkurs",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik",
    });
  }
}

export async function deleteGameById({ id, token, alert, callBack }) {
  try {
    const res = await axios({
      method: "DELETE",
      url: `${server}/konkurs/${id}`,
      headers: {
        auth: token,
      },
    });
    alert.success({ title: "Konkurs", text: "Muvaffaqiyatli o'chirildi!" });
    callBack();
    return res.data;
  } catch (error) {
    alert.error({
      title: "Konkurs",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik",
    });
  }
}

//Konkurs end

//Payment start

export async function getUserPayments({ token }) {
  const res = await axios({
    method: "GET",
    url: `${server}/payment/user-payment`,
    headers: {
      auth: token,
    },
  });
  return res.data;
}

export async function addUserPayment(payload) {
  try {
    const res = await axios({
      method: "POST",
      url: `${server}/payment/add`,
      headers: {
        auth: `12345${payload.token}`,
      },
    });
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

//Payment end

// User orders request start

export async function getUserOrders(token) {
  const res = await axios({
    method: "get",
    url: `${server}/order/all`,
    headers: {
      auth: token,
    },
  });

  return res.data;
}

export async function createOrder({ data, token, alert }) {
  try {
    const res = await axios({
      method: "POST",
      url: `${server}/order/add`,
      headers: {
        auth: token,
      },
      data: data,
    });
    alert.success({ title: "Buyurtma", text: "Muvaffaqiyatli qo`shildi!" });
    return res.data;
  } catch (error) {
    alert.error(
      error?.response?.data?.message
        ? error.response.data.message
        : "Nomalum xatolik yuz berdi"
    );
  }
}

export async function getSingleOrder({ token, _id }) {
  const res = await axios({
    method: "get",
    url: `${server}/order/${_id}`,
    headers: {
      auth: token,
    },
  });
  return res.data;
}

export async function getOrdersFromQr({ token }) {
  const res = await axios({
    url: `${server}/order/admin/ready`,
    method: "GET",
    headers: {
      auth: token,
    },
  });

  return res.data;
}

// User orders request end

//Black listed customers

export async function getBlackListedCustmers({ token, page }) {
  const res = await axios({
    method: "GET",
    url: `${server}/blacklist`,
    headers: {
      auth: token,
    },
    params: {
      page,
    },
  });
  return res.data;
}

export async function deleteFromBlackList({ token, callBack, id }) {
  const res = await axios({
    method: "DELETE",
    url: `${server}/blacklist/${id}`,
    headers: {
      auth: token,
    },
  });

  callBack(res.status == 200);

  return res.data;
}

export async function updateFromBlackList({ token, callBack, data, id }) {
  const res = await axios({
    method: "PUT",
    url: `${server}/blacklist/${id}`,
    headers: {
      auth: token,
    },
    data,
  });

  callBack(res.status == 200);

  return res.data;
}

export async function addToBlockList({ token, data, callBack }) {
  const res = await axios({
    method: "post",
    url: `${server}/blacklist/add`,
    headers: {
      auth: token,
    },
    data: data,
  });

  callBack(res.status);

  return res.data;
}

// Customers actions

export async function getAdminCustomersList({ token, params }) {
  const res = await axios({
    method: "GET",
    url: `${server}/user`,
    headers: {
      auth: token,
    },
    params,
  });
  return res.data;
}

export async function getAdminCustomersStats({ token, params }) {
  const res = await axios({
    method: "GET",
    url: `${server}/user/statistics?userId=${params.userId}&type=${params.type}&status=${params.status}&page=${params.page}`,
    headers: {
      auth: token,
    },
  });
  return res.data;
}

export async function updateCustomerStats({ token, params, id }) {
  const res = await axios.put({
    method: "PUT",
    url: `${server}/user/admin/${id}`,
    headers: {
      auth: token,
    },
    params,
  });
  return res?.data;
}

//Operators actions

export async function getAdminOperatorsList({ token, params }) {
  const res = await axios({
    method: "GET",
    url: `${server}/user/operator`,
    headers: {
      auth: token,
    },
    params,
  });
  return res.data;
}

export async function getAdminOperatorStats({ token, params }) {
  const res = await axios({
    method: "GET",
    url: `${server}/user/operator/statistics?userId=${params.userId}&type=${params.type}&status=${params.status}&page=${params.page}`,
    headers: {
      auth: token,
    },
  });
  return res.data;
}

export async function renewOperatorOrders({ uid, token, alert, callBack }) {
  try {
    const res = await axios({
      method: "PUT",
      url: `${server}/operator/order/renew/${uid}`,
      headers: {
        auth: token,
      },
    });
    callBack();
    alert.success({ title: "Okay", text: "Buyurtmalar olib tashlandi" });
    return res.data;
  } catch (error) {
    alert.error({
      title: "Ooops",
      text: error?.response?.data?.message,
    });
  }
}

export async function addOperatorAsync({ token, values, alert, callBack }) {
  try {
    const res = await axios({
      method: "POST",
      url: `${server}/user/admin/add-operator`,
      headers: {
        auth: token,
      },
      data: values,
    });
    callBack();
    alert.success({ title: "Okay", text: "Admin qo'shildi!" });
    return res.data;
  } catch (error) {
    alert.error({
      title: "Ooops",
      text: error?.response?.data?.message,
    });
  }
}



// Comments Request

export async function getCommentsList({ id }) {
  const res = await axios({
    method: "GET",
    url: `${server}/comments/${id}`,
  });
  return res.data;
}

export async function addComment(payload) {
  try {
    const res = await axios({
      method: "POST",
      url: `${server}/contacts`,
      headers: {
        auth: `12345${payload.token}`,
      },
    });
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
}
//Payments reducer

export async function getAdminPaymentsList({ token, params }) {
  const res = await axios({
    method: "GET",
    url: `${server}/payment/admin-payment`,
    headers: {
      auth: token,
    },
    params,
  });
  return res.data;
}

export async function updatePaymentStatus({
  token,
  data,
  handleClose,
  alert,
  callback,
}) {
  try {
    await axios({
      method: "PUT",
      url: `${server}/payment/${data?.paymentId}`,
      headers: {
        auth: token,
      },
      data,
    });
    alert.success({ title: "Okay", text: "To'lov yangilandi!" });
    callback();
    handleClose();
  } catch (error) {
    handleClose();
    callback();
    alert.error({
      title: "Ooops",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik yuz berdi. Qaytadan urinib kuring",
    });
  }
}

//Admin Orders Asyn Requests

export async function getAdminOrders({ token, params, isSE = false }) {
  const res = await axios({
    method: "GET",
    url: `${server}/order/admin/${isSE ? "getall" : "filter-time"}`,
    headers: {
      auth: token,
    },
    params: { ...params },
  });
  return res.data;
}

export async function getAdminOrdersByStatus({ token, params }) {
  const res = await axios({
    method: "GET",
    url: `${server}/order/admin/getall`,
    headers: {
      auth: token,
    },
    params: { ...params },
  });
  return res.data;
}

export async function changeOrderStatusFromArchived({ token, params }) {
  const res = await axios({
    url: `${server}/order/admin/${params.id}`,
    method: "PUT",
    data: params.data,
    headers: {
      auth: token,
    },
  });

  params.callBack(res.status == 200);

  return res.data;
}

export async function changeManyOrders({ token, params }) {
  const res = await axios({
    url: `${server}/order/admin/many`,
    method: "PUT",
    data: params.data,
    headers: {
      auth: token,
    },
  });

  params.callBack(res.status == 200);

  return res.data;
}

export async function searchAdminOrders({ token, query }) {
  const res = await axios({
    method: "GET",
    url: `${server}/order/admin-search?filter=${query}`,
    headers: {
      auth: token,
    },
  });

  return res.data;
}

//Dashboard Async requests

export async function getDashboardOrderStatistics({ token }) {
  const res = await axios({
    method: "GET",
    url: `${server}/order/admin-status`,
    headers: {
      auth: token,
    },
  });

  return res.data;
}

export async function getDashboardWeeklyOrderCount({ token }) {
  const res = await axios({
    method: "GET",
    url: `${server}/order/admin/week`,
    headers: {
      auth: token,
    },
  });

  return res.data;
}

export async function getDashboardMostSoldProducts({ token }) {
  const res = await axios({
    method: "GET",
    url: `${server}/product/delivered`,
    headers: {
      auth: token,
    },
  });
  return res.data;
}

export async function getOrdersByCityId({ token }) {
  const res = await axios({
    method: "GET",
    url: `${server}/order/admin/city`,
    headers: {
      auth: token,
    },
  });

  return res.data;
}

// printer data

export async function getDataForPrinter({ token }) {
  const res = await axios({
    url: `${server}/order/admin/getall?status=ready`,
    method: "get",
    headers: {
      auth: token,
    },
  });

  return res.data;
}

// printer data

export async function getAppSetting({ token }) {
  const res = await axios({
    url: `${server}/setting`,
    method: "GET",
    headers: {
      auth: token,
    },
  });
  return res.data;
}

//Site settings

export async function getSiteFulldata({ code, alert, callback }) {
  try {
    const res = await axios({
      url: `https://vipcrm.herokuapp.com/api/apps/${code}`,
      method: "GET",
    });
    if (!res.data) {
      alert.error({
        title: "Ooops",
        text: error?.response?.data?.message
          ? error?.response?.data?.message
          : "Malumot topilmadi. Qaytadan urinib kuring",
      });
      return;
    }
    callback();
    return res.data;
  } catch (error) {
    alert.error({
      title: "Ooops",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Malumot topilmadi. Qaytadan urinib kuring",
    });
    return error;
  }
}

export async function updateWebApp({ token, data, alert }) {
  try {
    await axios({
      method: "POST",
      url: `${server}/setting`,
      headers: {
        auth: token,
      },
      data,
    });
    alert.success({ title: "Okay", text: "Sozlamalar saqlandi!" });
  } catch (error) {
    alert.error({
      title: "Ooops",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik yuz berdi. Qaytadan urinib kuring",
    });
  }
}

// bot settings

export async function getBotDetails({ token }) {
  const res = await axios({
    url: `${server}/botsettings`,
    method: "GET",
    headers: {
      auth: token,
    },
  });
  return res.data;
}

export async function updateTelegramBot({ token, data, alert }) {
  try {
    await axios({
      method: "PUT",
      url: `${server}/botsettings`,
      headers: {
        auth: token,
      },
      data,
    });
    alert.success({ title: "Okay", text: "Sozlamalar saqlandi!" });
  } catch (error) {
    alert.error({
      title: "Ooops",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik yuz berdi. Qaytadan urinib kuring",
    });
  }
}

// sms settings

export async function getSmsDetails({ token }) {
  const res = await axios({
    url: `${server}/sms-service`,
    method: "GET",
    headers: {
      auth: token,
    },
  });
  return res.data;
}

export async function updateSmsSts({ token, data, alert }) {
  try {
    await axios({
      method: "PUT",
      url: `${server}/sms-service`,
      headers: {
        auth: token,
      },
      data,
    });
    alert.success({ title: "Okay", text: "Sozlamalar saqlandi!" });
  } catch (error) {
    alert.error({
      title: "Ooops",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik yuz berdi. Qaytadan urinib kuring",
    });
  }
}

// sms settings

export async function getDashboardStatistics({ token }) {
  const res = await axios({
    url: `${server}/user/balance`,
    method: "GET",
    headers: {
      auth: token,
    },
  });
  return res.data;
}

export async function getDashboardTotalStatistics({ token }) {
  const res = await axios({
    url: `${server}/order/admin-total-balance`,
    method: "GET",
    headers: {
      auth: token,
    },
  });
  return res.data;
}

export async function editAdminCustomer({ token, alert, params }) {
  try {
    await axios({
      method: "PUT",
      url: `${server}/user/admin/${params?.id}`,
      headers: {
        auth: token,
      },
      data: params?.data,
    });
    params?.callBack();
    alert.success({ title: "Profile", text: "Profile malumoti yangilandi !" });
  } catch (error) {
    alert.error({
      title: "Ooops",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik yuz berdi. Qaytadan urinib kuring",
    });
  }
}

export async function getInvoicesByStatus({ token, params }) {
  const res = await axios({
    method: "GET",
    url: `${server}/invoices`,
    headers: {
      auth: token,
    },
    params: params,
  });
  return res.data;
}

export async function updateOrdersByFilter({
  token,
  params,
  alert,
  data,
  callback,
}) {
  try {
    await axios({
      method: "PUT",
      url: `${server}/order/admin/updateAll`,
      headers: {
        auth: token,
      },
      params: params,
      data,
    });
    callback();
    alert.success({ title: "Okay", text: "Buyurtmalar holati o'zgardi" });
  } catch (error) {
    callback();
    alert.error({
      title: "Ooops",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik yuz berdi. Qaytadan urinib kuring",
    });
  }
}

export async function addAllSiteBanners({ token, alert, data, callback }) {
  try {
    await axios({
      method: "POST",
      url: `${server}/banner`,
      headers: {
        auth: token,
      },
      data,
    });
    callback();
    alert.success({ title: "Okay", text: "Banner qo'shildi" });
  } catch (error) {
    callback();
    alert.error({
      title: "Ooops",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik yuz berdi. Qaytadan urinib kuring",
    });
  }
}

//get banners

export async function getAdminCarouselBanners({ token }) {
  const res = await axios({
    url: `${server}/banner`,
    method: "GET",
    headers: {
      auth: token,
    },
  });
  return res.data;
}

export async function deleteAdminCarouselBanner({
  token,
  id,
  alert,
  callBack,
}) {
  try {
    const res = await axios({
      url: `${server}/banner/${id}`,
      method: "DELETE",
      headers: {
        auth: token,
      },
    });
    callBack();
    alert.success({ text: "Banner o'chirildi", title: "Banner" });
    return res.data;
  } catch (error) {
    callBack();
    alert.error({
      title: "Ooops",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik yuz berdi. Qaytadan urinib kuring",
    });
  }
}

export async function updateAdminBannerStatus({
  token,
  id,
  alert,
  callBack,
  data,
}) {
  try {
    const res = await axios({
      url: `${server}/banner/${id}`,
      method: "PUT",
      headers: {
        auth: token,
      },
      data,
    });
    callBack();
    alert.success({ text: "Banner o'chirildi", title: "Banner" });
    return res.data;
  } catch (error) {
    callBack();
    alert.error({
      title: "Ooops",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik yuz berdi. Qaytadan urinib kuring",
    });
  }
}

export async function generateMediaLinks({ token, data, alert }) {
  try {
    const res = await axios({
      method: "POST",
      url: `${server}/fileupload`,
      headers: {
        auth: token,
      },
      data,
    });
    return res.data;
  } catch (error) {
    alert.error({
      title: "Ooops",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik",
    });
  }
}

export async function getBrandsAll({ token, params }) {
  const res = await axios({
    url: `${server}/brands`,
    method: "GET",
    auth: token,
    params: {
      limit: params?.limit,
      countPage: params?.page,
    },
  });
  return res.data;
}

export async function createBrandsByCategory({
  data,
  token,
  alert,
  callback,
  close,
}) {
  try {
    const res = await axios({
      method: "POST",
      url: `${server}/brands`,
      headers: {
        auth: token,
      },
      data: data,
    });
    alert.success({ title: "Brend", text: "Muvaffaqiyatli qo`shildi!" });
    callback();
    close();

    return res.data;
  } catch (error) {
    alert.error({
      title: "Ooops",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik",
    });
    close();
    return error;
  }
}

export async function deleteBrandsByUid({
  uid,
  token,
  alert,
  callback,
  close,
}) {
  try {
    await axios({
      method: "DELETE",
      url: `${server}/brands/${uid}`,
      headers: {
        auth: token,
      },
    });
    alert.success({ title: "Okay", text: "Brend o'chirildi" });
    callback();
    close();
  } catch (error) {
    alert.error({
      title: "Ooops",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik",
    });
    close();
    return error;
  }
}

export async function updateBrandsByUid({
  uid,
  data,
  token,
  alert,
  callback,
  close,
}) {
  try {
    await axios({
      method: "PUT",
      url: `${server}/brands/${uid}`,
      data: data,
      headers: {
        auth: token,
      },
    });
    alert.success({ title: "Okay", text: "Brend yangilandi" });
    callback();
    close();
  } catch (error) {
    alert.error({
      title: "Ooops",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik",
    });
    close();
    return error;
  }
}

export async function getAllCountry() {
  const res = await axios({
    url: "https://countryapi.io/api/all?apikey=HRQzI3O5bHzqsf26HiE666gh1flUy2yATP6VFxom",
    method: "GET",
  });
  return res.data;
}

export async function getAllSkUList({ sku, token }) {
  const res = await axios({
    method: "GET",
    url: `${server}/product/skus/${sku}`,
    headers: {
      auth: token,
    },
  });
  return res.data;
}

export async function updateProductSKUList({ data, token, alert, callback }) {
  try {
    // Modify referalPrice to include comission for each SKU in the skuList
    data.skuList = data.skuList.map((sku) => ({
      ...sku,
      adminPrice: (sku.DeliveryPrice || 0),
      operatorPrice: 3000
    }));

    await axios({
      method: "PUT",
      url: `${server}/product/skus`,
      data: data,
      headers: {
        auth: token,
      },
    });
    
    alert.success({ title: "", text: "Mahsulot variantlari yangilandi" });
    callback();
  } catch (error) {
    alert.error({
      title: "Ooops",
      text: error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik",
    });
    return error;
  }
}