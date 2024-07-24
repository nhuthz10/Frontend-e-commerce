import axios from "../axios";


let handleGetProductTypeService = (id) => {
  return axios.get(
    `/api/product-type/get-product-type?id=${id}`,
    { withCredentials: true }
  );
};


let handleGetAllProductTypeService = (limit, page, name, pagination) => {
  return axios.get(
    `/api/product-type/get-all-product-type?limit=${limit}&page=${page}&name=${name}&pagination=${pagination}`,
    { withCredentials: true }
  );
};

let handleCreateProductTypeService = (data) => {
  return axios.post(`/api/product-type/create-product-type`, data, {
    withCredentials: true,
  });
};

let handleUpdateProductTypeService = (data) => {
  return axios.put(`/api/product-type/update-product-type`, data, {
    withCredentials: true,
  });
};

let handleDeleteProductTypeService = (id) => {
  return axios.delete(`/api/product-type/delete-product-type?id=${id}`, {
    withCredentials: true,
  });
};

let handleGetAllBrandService = (limit, page, name, pagination) => {
  return axios.get(
    `/api/brand/get-all-brand?limit=${limit}&page=${page}&name=${name}&pagination=${pagination}`,
    { withCredentials: true }
  );
};

let handleCreateBrandService = (data) => {
  return axios.post(`/api/brand/create-brand`, data, { withCredentials: true });
};

let handleUpdateBrandService = (data) => {
  return axios.put(`/api/brand/update-brand`, data, { withCredentials: true });
};

let handleDeleteBrandService = (id) => {
  return axios.delete(`/api/brand/delete-brand?id=${id}`, {
    withCredentials: true,
  });
};

let handleGetAllSizeService = (limit, page, name) => {
  return axios.get(
    `/api/size/get-all-size?limit=${limit}&page=${page}&name=${name}`,
    { withCredentials: true }
  );
};

let handleCreateSizeService = (data) => {
  return axios.post(`/api/size/create-size`, data, { withCredentials: true });
};

let handleUpdateSizeService = (data) => {
  return axios.put(`/api/size/update-size`, data, { withCredentials: true });
};

let handleDeleteSizeService = (id) => {
  return axios.delete(`/api/size/delete-size?id=${id}`, {
    withCredentials: true,
  });
};

let handleGetAllProductService = (limit, page, name) => {
  return axios.get(
    `/api/product/get-all-product?limit=${limit}&page=${page}&name=${encodeURIComponent(
      name
    )}`,
    { withCredentials: true }
  );
};

let handleCreateProductService = (data) => {
  return axios.post(`/api/product/create-product`, data, {
    withCredentials: true,
  });
};

let handleUpdateProductService = (data) => {
  return axios.put(`/api/product/update-product`, data, {
    withCredentials: true,
  });
};

let handleDeleteProductService = (id) => {
  return axios.delete(`/api/product/delete-product?id=${id}`, {
    withCredentials: true,
  });
};
let handleGetProductService = (productId) => {
  return axios.get(`/api/product/get-product?productId=${productId}`, {
    withCredentials: true,
  });
};

let handleGetAllProductSizeService = (productId, limit, page) => {
  return axios.get(
    `/api/product-size/get-all-product-size?productId=${productId}&limit=${limit}&page=${page}`,
    { withCredentials: true }
  );
};

let handleGetAllProductOfTheProductType = (
  productTypeId,
  limit,
  page,
  sort,
  filter
) => {
  return axios.get(
    `/api/product/get-all-product-of-the-product-type?productTypeId=${productTypeId}&limit=${limit}&page=${page}&sort=${sort}&filter=${filter}`,
    { withCredentials: true }
  );
};

let handleGetAllSizeOfTheProductType = (productTypeId) => {
  return axios.get(
    `/api/size/get-all-size-product-type?productTypeId=${productTypeId}`,
    { withCredentials: true }
  );
};

let handleCreateProductSizeService = (data) => {
  return axios.post(`/api/product-size/create-product-size`, data, {
    withCredentials: true,
  });
};

let handleDeleteProductSizeService = (id) => {
  return axios.delete(`/api/product-size/delete-product-size?id=${id}`, {
    withCredentials: true,
  });
};

let handleUpdateProductSizeService = (data) => {
  return axios.put(`/api/product-size/update-product-size`, data, {
    withCredentials: true,
  });
};

let handleCreateNewVoucher = (data) => {
  return axios.post(`/api/voucher/create-voucher`, data, {
    withCredentials: true,
  });
};

let handleUpdateVoucherService = (data) => {
  return axios.put(`/api/voucher/update-voucher`, data, {
    withCredentials: true,
  });
};

let handleDeleteVoucher = (id) => {
  return axios.delete(`/api/voucher/delete-voucher?id=${id}`, {
    withCredentials: true,
  });
};
let handleGetAllVoucher = (limit, page, pagination) => {
  return axios.get(
    `/api/voucher/get-all-voucher?limit=${limit}&page=${page}&pagination=${pagination}`,
    { withCredentials: true }
  );
};

let handleGetAllVoucherUserService = () => {
  return axios.get(`/api/voucher/get-all-voucher-user`, {
    withCredentials: true,
  });
};

let handleGetAllProductFeedback = (userId) => {
  return axios.get(`/api/product/get-product-feedback?userId=${userId}`, {
    withCredentials: true,
  });
};

let handleCreateFeedbackService = (data) => {
  return axios.post(`/api/feedback/create-feedback`, data, {
    withCredentials: true,
  });
};

let handleAllFeedbackService = (productId) => {
  return axios.get(`/api/feedback/get-all-feedback?productId=${productId}`, {
    withCredentials: true,
  });
};

let handleUpdateFeedbackService = (data) => {
  return axios.put(`/api/feedback/update-feedback`, data, {
    withCredentials: true,
  });
};

let handleDeleteFeedbackService = (id, userId) => {
  return axios.delete(
    `/api/feedback/delete-feedback?feedbackId=${id}&userId=${userId}`,
    { withCredentials: true }
  );
};

let handleGetAllProductSaleOffService = (limit, page) => {
  return axios.get(
    `/api/product/get-product-sale-off?limit=${limit}&page=${page}`,
    { withCredentials: true }
  );
};

let handleGetAllProductFavorute = (limit, page, userId) => {
  return axios.get(
    `/api/product/get-product-favourite?userId=${userId}&limit=${limit}&page=${page}`,
    { withCredentials: true }
  );
};

let handleGetProductName = (productId) => {
  return axios.get(`/api/product/get-product-name?productId=${productId}`, {
    withCredentials: true,
  });
};

export {
  handleGetProductTypeService,
  handleGetAllProductTypeService,
  handleCreateProductTypeService,
  handleUpdateProductTypeService,
  handleDeleteProductTypeService,
  handleGetAllBrandService,
  handleCreateBrandService,
  handleUpdateBrandService,
  handleDeleteBrandService,
  handleGetAllSizeService,
  handleCreateSizeService,
  handleUpdateSizeService,
  handleDeleteSizeService,
  handleGetAllProductService,
  handleCreateProductService,
  handleUpdateProductService,
  handleDeleteProductService,
  handleGetProductService,
  handleGetAllProductSizeService,
  handleGetAllSizeOfTheProductType,
  handleCreateProductSizeService,
  handleDeleteProductSizeService,
  handleUpdateProductSizeService,
  handleGetAllProductOfTheProductType,
  handleCreateNewVoucher,
  handleUpdateVoucherService,
  handleDeleteVoucher,
  handleGetAllVoucher,
  handleGetAllVoucherUserService,
  handleGetAllProductFeedback,
  handleCreateFeedbackService,
  handleAllFeedbackService,
  handleUpdateFeedbackService,
  handleDeleteFeedbackService,
  handleGetAllProductSaleOffService,
  handleGetAllProductFavorute,
  handleGetProductName,
};
