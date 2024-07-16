import axios from "../axios";

let handleLoginService = (email, password) => {
  return axios.post(
    "/api/user/login",
    { email: email, password: password },
    { withCredentials: true }
  );
};

let handleGetUserAfterLoginService = async (userId) => {
  return await axios.get(`/api/user/get-user-infor?userId=${userId}`, {
    withCredentials: true,
  });
};

let handleRegisterService = (data) => {
  return axios.post("/api/user/register", data, { withCredentials: true });
};

let handleCreateANewUserService = (data) => {
  return axios.post("/api/user/create-user", data, { withCredentials: true });
};

let handleSendOptService = (email) => {
  return axios.post(
    "/api/user/send-otp-code",
    { email: email },
    { withCredentials: true }
  );
};

let handleChangePasswordService = (data) => {
  return axios.put("/api/user/change-password", data, {
    withCredentials: true,
  });
};

let handleGetInforUserService = (id) => {
  return axios.get(`/api/user/get-user?id=${id}`, { withCredentials: true });
};

let handleUpdateUser = (data) => {
  return axios.put("/api/user/update-user", data, { withCredentials: true });
};

let handleChangePasswordProfile = (data) => {
  return axios.put("/api/user/change-password-profile", data, {
    withCredentials: true,
  });
};

let handleGetAllUserService = (limit, page, name) => {
  return axios.get(
    `/api/user/get-all-user?limit=${limit}&page=${page}&name=${name}`,
    { withCredentials: true }
  );
};

let handleDeleteService = (id) => {
  return axios.delete(`/api/user/delete-user?id=${id}`, {
    withCredentials: true,
  });
};

let handleGetAllRoleService = () => {
  return axios.get(`/api/user/get-all-role`, { withCredentials: true });
};

let handleCreateFavourite = (data) => {
  return axios.post("/api/favourite/create-favourite", data, {
    withCredentials: true,
  });
};

let handleDeleteFavourite = (userId, productId) => {
  return axios.delete(
    `/api/favourite/delete-favourite?userId=${userId}&productId=${productId}`,
    { withCredentials: true }
  );
};

let handleGetAllFavourite = (userId) => {
  return axios.get(`/api/favourite/get-all-favourite?userId=${userId}`, {
    withCredentials: true,
  });
};

export {
  handleLoginService,
  handleRegisterService,
  handleCreateANewUserService,
  handleSendOptService,
  handleChangePasswordService,
  handleGetInforUserService,
  handleUpdateUser,
  handleChangePasswordProfile,
  handleGetAllUserService,
  handleDeleteService,
  handleGetAllRoleService,
  handleCreateFavourite,
  handleDeleteFavourite,
  handleGetAllFavourite,
  handleGetUserAfterLoginService,
};
