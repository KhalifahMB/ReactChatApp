import { useRef } from "react";
import { useAppContext } from "../contexts/appContext";
import getRelativeTime from "../utils/getRelativeDate";

/* eslint-disable react/prop-types */
const Message = ({ message }) => {
  const { currentUser, user } = useAppContext();
  const timestamp = getRelativeTime(message.date);
  const ref = useRef();

  return (
    <div
      ref={ref}
      className={`message ${message.senderID == currentUser.uid && "incoming"}`}
    >
      <div className="message-content">
        <img
          className="image"
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : user.photoURL
          }
          alt="profile picture"
        />
        <div className="details">
          <p>{message.message}</p>
          {message.img && <img src={message.img} alt="" />}
          <span>{timestamp}</span>
        </div>
      </div>
    </div>
  );
};

export default Message;
