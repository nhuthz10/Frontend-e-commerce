"use client";
import GridData from "@/components/GridData/GridData";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSubscriber } from "@/redux-toolkit/adminSlice";
import { loadingAdmin } from "@/redux-toolkit/adminSlice";
import { LIMIT } from "@/utils";
import { handleChangePage } from "@/redux-toolkit/paginationSlice";

const Subscribed = () => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.pagination.page);
  const totalPage = useSelector(
    (state) => state.admin.allSubscriber?.totalPage
  );

  const handleSendMail = async () => {
    try {
      dispatch(loadingAdmin(true));
      const res = await fetch("/api/sendMail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: process.env.MAILCHIMP_CAMPAIGN_ID || "012c206557",
        }),
      });
      const result = await res.json();
      console.log(result);
      toast.success("Gửi mail thành công");
    } catch (err) {
      console.log(err);
      toast.error(err);
    } finally {
      dispatch(loadingAdmin(false));
    }
  };

  const handleDeleteEmail = async (email, isLast) => {
    try {
      dispatch(loadingAdmin(true));
      const res = await fetch("/api/email", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      const result = await res.json();
      // console.log(result);
      if (result) {
        await dispatch(
          fetchAllSubscriber({
            limit: LIMIT,
            page: totalPage === page && isLast ? page - 1 : page,
          })
        );
        if (totalPage === page && isLast) dispatch(handleChangePage(page - 1));
        toast.success("Xóa email thành công");
      }
    } catch (err) {
      console.log(err);
      toast.error(err);
      // if (err?.response?.data?.errCode === 2) {
      //   toast.error("Người dùng không tồn tại");
      // } else if (err?.response?.data?.errCode === -4) {
      //   toast.error("Phiên bản đăng nhập hết hạn");
      //   dispatch(logOut());
      // } else {
      //   toast.error(err?.response?.data?.message);
      // }
    } finally {
      dispatch(loadingAdmin(false));
    }
  };

  const tableColumns = [
    {
      label: "STT",
      key: "",
      style: { borderTopLeftRadius: 15, paddingLeft: "2rem" },
    },
    { label: "EMAIL", key: "email_address" },
    { label: "NGƯỜI DÙNG", key: "bamito_status" },
    { label: "", key: "", style: { borderTopRightRadius: 15 } },
  ];

  return (
    <GridData
      tableColumns={tableColumns}
      handleDelete={handleDeleteEmail}
      headerString="Email marketing"
      gridType="subscriber"
      handleSendMail={handleSendMail}
    />
  );
};

export default Subscribed;
