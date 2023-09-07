/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/appContext";
import { Link, Navigate } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import "../assets/css/users.scss";

const Users = () => {
  const [users, setUsers] = useState([]);
  const { currentUser, user, chatId, dispatch } = useContext(AppContext);
  const [err, setErr] = useState(false);
  useEffect(() => {
    const timerId = setTimeout(() => {
      setErr("");
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [err]);
  useEffect(() => {
    // Fetch users data from Firestore
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const userData = [];
        querySnapshot.forEach((doc) => {
          if (doc.data().uid == currentUser.uid) {
            return;
          }
          userData.push(doc.data());
        });
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching users: ", error);
        setErr(true);
      }
    };

    fetchUsers();
  }, []);

  const handleSelect = async (userid) => {
    dispatch({ type: "CHANGE_USER", payload: userid });
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    console.log("chat id ", chatId);
    console.log("combinedId", combinedId);

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
      alert("added to friend list");
    } catch (err) {
      console.log(err);
    }

    <Navigate to="/" />;
  };

  return (
    <div className="users">
      <h1>User List</h1>
      <Link to="/"> Back to Homes</Link>
      {err && (
        <p className="error">Error fetching users. Please try again later.</p>
      )}
      <ul className="user-list">
        {users.map((user) => (
          <li
            key={user.uid}
            className="user-item"
            onClick={() => {
              handleSelect(user);
            }}
          >
            <div className="user-info">
              <img src={user.photoURL} alt="" className="user-avatar" />
              <div className="user-details">
                <h2>{user.displayName}</h2>
                <p>Email: {user.email}</p>
                {/* Add other user information here */}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
