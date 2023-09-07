import { useContext, useRef } from "react";
import { AppContext } from "../contexts/appContext";
import getRelativeTime from "../utils/getRelativeDate";

/* eslint-disable react/prop-types */
const Message = ({ message }) => {
  const { currentUser, user } = useContext(AppContext);
  const timestamp = getRelativeTime(message.date.toDate());
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
          {message.img && <img src={message.img} className="msgImg" alt="" />}
          <span className="time">{timestamp}</span>
        </div>
      </div>
    </div>
  );
};

export default Message;
