"use client";
import Image from "next/image";
import "./FacebookChat.scss";
const FaceBookChat = () => {
  const handleClickFacebookChat = () => {
    window.open(`https://m.me/389139854277684`, "_blank");
  };

  return (
    <div
      className="Facebook-chat-container"
      onClick={() => handleClickFacebookChat()}
    >
      <Image
        src="/images/facebook-messenger.webp"
        height={50}
        width={50}
      ></Image>
    </div>
  );
};

export default FaceBookChat;
