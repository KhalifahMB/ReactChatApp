/* eslint-disable react/prop-types */
import { createContext, useEffect, useReducer } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AppContext = createContext();
const initialState = {
  currentUser: {},
  user: {},
  chatId: "null",
};

const reducer = (state, action) => {
  if (action.type === "SET_CURRENT_USER") {
    return {
      ...state,
      currentUser: action.payload.user,
    };
  }
  if (action.type === "SET_CHAT_ID") {
    return {
      ...state,
      chatId: action.payload,
    };
  }
  if (action.type === "CHANGE_USER") {
    console.log("action payload", action.payload);

    return {
      ...state,
      user: action.payload,
      chatId:
        state.currentUser.uid > action.payload.uid
          ? state.currentUser.uid + action.payload.uid
          : action.payload.uid + state.currentUser.uid,
    };
  }
  throw new Error(`${action.type} does not exist `);
};
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch({ type: "SET_CURRENT_USER", payload: { user } });
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <>
      <AppContext.Provider
        value={{
          ...state,
          dispatch,
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
};

// const useAppContext = () => {
//   return useContext(AppContext);
// };

export {
  AppProvider,
  // initialState,
  // useAppContext
};
