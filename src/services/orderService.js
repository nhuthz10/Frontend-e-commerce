import axios from "../axios";

let handleCreateNewOrderService = (data) => {
  return axios.post("/api/order/create-order", data, { withCredentials: true });
};

let handleGetAllOrderService = (userId, status, limit, page) => {
  return axios.get(
    `/api/order/get-all-order?userId=${userId}&status=${status}&limit=${limit}&page=${page}`,
    { withCredentials: true }
  );
};

let handleGetOrderDetailService = (orderId, userId) => {
  return axios.get(
    `/api/order/get-order-detail?orderId=${orderId}&userId=${userId}`,
    { withCredentials: true }
  );
};

let handleCancleOrderService = (data) => {
  return axios.put(`/api/order/cancle-order`, data, { withCredentials: true });
};

let handleDeliveringOrderService = (data) => {
  return axios.put(`/api/order/delivering-order`, data, {
    withCredentials: true,
  });
};

let handleSucceedOrderService = (data) => {
  return axios.put(`/api/order/succeed-order`, data, { withCredentials: true });
};

let handleDeleteOrderService = (orderId) => {
  return axios.delete(`/api/order/delete-order?orderId=${orderId}`, {
    withCredentials: true,
  });
};

let handleGetAllOrderAdmin = (status, limit, page) => {
  return axios.get(
    `/api/order/get-all-order-admin?status=${status}&limit=${limit}&page=${page}`,
    { withCredentials: true }
  );
};

let handleGetAllOrderStatistics = () => {
  return axios.get(`/api/order/order-statistics`, { withCredentials: true });
};

let handleGetAllProductReport = (timeStart, timeEnd, limit, page) => {
  return axios.get(
    `/api/order/order-report?timeStart=${timeStart}&timeEnd=${timeEnd}&limit=${limit}&page=${page}`,
    { withCredentials: true }
  );
};

let handlePaymentByVnPayService = (data) => {
  return axios.post(`/api/order/create_payment_url`, data, {
    withCredentials: true,
  });
};

export {
  handleGetAllOrderStatistics,
  handleCreateNewOrderService,
  handleGetAllOrderService,
  handleGetOrderDetailService,
  handleCancleOrderService,
  handleDeliveringOrderService,
  handleGetAllOrderAdmin,
  handleSucceedOrderService,
  handleDeleteOrderService,
  handleGetAllProductReport,
  handlePaymentByVnPayService,
};
