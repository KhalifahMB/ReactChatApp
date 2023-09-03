import getRelativeTime from "../utils/getRelativeDate";

/* eslint-disable react/prop-types */
const Incoming = ({ message }) => {
  const timestamp = getRelativeTime(message.timestamp);

  return (
    <div className="message incoming">
      <div className="message-content">
        <img
          className="image"
          src={message.photoURL}
          alt="no image"
          sizes=""
          srcSet=""
        />
        <div className="details">
          <h3>{message.username}</h3>
          <p>{message.text}</p>
          <span>{timestamp}</span>
        </div>
      </div>
    </div>
  );
};

export default Incoming;
