import getRelativeTime from "../utils/getRelativeDate";

/* eslint-disable react/prop-types */
const Outgoing = ({ message }) => {
  const timestamp = getRelativeTime(message.timestamp);
  return (
    <div className="message outgoing">
      <div className="message-content">
        <div className="details">
          <h3>{message.username}</h3>
          <p>{message.text}</p>
          <span>{timestamp}</span>
        </div>
        <img
          className="image"
          src={message.photoURL}
          alt="no image"
          sizes=""
          srcSet=""
        />
      </div>
    </div>
  );
};

export default Outgoing;
