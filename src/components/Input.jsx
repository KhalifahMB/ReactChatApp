import { useContext, useState } from "react";
import { AppContext } from "../contexts/appContext";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Timestamp, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { serverTimestamp } from "firebase/database";
import "../assets/css/chat-input.scss";

const Input = () => {
  const { currentUser, chatId, user } = useContext(AppContext);

  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (message || image) {
        const messageData = {
          id: uuid(),
          senderID: currentUser.uid,
          date: Timestamp.now(),
        };

        if (message) {
          messageData.message = message;
        }

        if (image) {
          const storageRef = ref(storage, uuid());
          const uploadImg = uploadBytesResumable(storageRef, image);

          uploadImg.on(
            "state_changed",
            null,
            (error) => {
              console.log(error);
            },
            () => {
              getDownloadURL(uploadImg.snapshot.ref).then(
                async (downloadUrl) => {
                  messageData.img = downloadUrl;
                  await sendMessage(messageData);
                }
              );
            }
          );
        } else {
          await sendMessage(messageData);
        }
      }

      setLoading(false);
      setMessage("");
      setImage(null);
    } catch (error) {
      console.log("Error sending message:", error);
      setLoading(false);
    }
  };

  const sendMessage = async (messageData) => {
    await updateDoc(doc(db, "chats", chatId), {
      message: arrayUnion(messageData),
    });

    const chatUpdate = {
      [chatId + ".lastMessage"]: {
        message: messageData.message || "Image",
        date: serverTimestamp(),
      },
    };

    await updateDoc(doc(db, "userChats", currentUser.uid), chatUpdate);
    await updateDoc(doc(db, "userChats", user.uid), chatUpdate);
  };

  return (
    <div className="chat-input">
      <form className="input" onSubmit={handleSubmit}>
        <input
          type="text"
          id="message-input"
          placeholder="Type your message..."
          value={message}
          onChange={handleChange}
        />
        <div>
          <label htmlFor="file" className="image-upload-label">
            &#128247;
            <input
              type="file"
              style={{ display: "none" }}
              onChange={handleImageChange}
              id="file"
            />
          </label>
          {(message || image) && (
            <input
              type="submit"
              id="send-button"
              value="Send"
              disabled={isLoading}
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default Input;
