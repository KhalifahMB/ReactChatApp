import { useContext, useState } from "react";
import { AppContext } from "../contexts/appContext";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Timestamp, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { serverTimestamp } from "firebase/database";

const Input = () => {
  const { currentUser, chatId, user } = useContext(AppContext);

  const [isloading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [image, setimage] = useState(null);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (image) {
        const storageRef = ref(storage, uuid());
        const uploadImg = uploadBytesResumable(storageRef, image);

        uploadImg.on(
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadImg.snapshot.ref).then(async (downloadUrl) => {
              await updateDoc(doc(db, "chats", chatId), {
                message: arrayUnion({
                  id: uuid(),
                  message,
                  senderID: currentUser.uid,
                  date: Timestamp.now(),
                  img: downloadUrl,
                }),
              });
            });
          }
        );
      } else {
        await updateDoc(doc(db, "chats", chatId), {
          message: arrayUnion({
            id: uuid(),
            message,
            senderID: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      }

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [chatId + ".lastMessage"]: {
          message,
        },
        [chatId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", user.uid), {
        [chatId + ".lastMessage"]: {
          message,
        },
        [chatId + ".date"]: serverTimestamp(),
      });

      setLoading(false);
      setMessage("");
      setimage(null);
    } catch (error) {
      console.log("Error sending message:", error);
      setLoading(false);
      setMessage("");
      setimage(null);
    }
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
          <label htmlFor="file">
            <span style={{ cursor: "pointer" }}>&#128247;</span>
          </label>
          <input
            type="file"
            style={{ display: "none" }}
            onChange={(e) => setimage(e.target.files[0])}
            id="file"
          />
          {message && (
            <input
              type="submit"
              id="send-button"
              value="Send"
              disabled={isloading}
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default Input;
