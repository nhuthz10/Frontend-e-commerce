"use client";
import { useEffect } from "react";
import Script from "next/script";
import "./ZaloZhat.scss";

const ZaloChat = () => {
  useEffect(() => {
    if (window.ZaloChatWidget) {
      window.ZaloChatWidget();
    }
  }, []);

  return (
    <>
      <div
        className="zalo-chat-widget"
        data-oaid={process.env.NEXT_PUBLIC_ZALO_ID}
        data-welcome-message="Rất vui khi được hỗ trợ bạn!"
        data-autopopup="30"
        data-width=""
        data-height=""
      ></div>
      <Script
        strategy="lazyOnload"
        src="https://sp.zalo.me/plugins/sdk.js"
      ></Script>
    </>
  );
};

export default ZaloChat;
