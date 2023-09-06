/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { createContext, useEffect, useReducer, useContext } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const AppContext = createContext();
const initialState = {
  currentUser: {},
  user: {},
  chatId: "null",
};

const reducer = (state, action) => {
  if (action.type == "SET_CURRENT_USER") {
    return {
      ...state,
      currentUser: action.payload.currentUser,
    };
  }
  if (action.type == "CHANGE_USER") {
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
          currentUser: state.currentUser,
          chatId: state.chatId,
          user: state.user,
          dispatch,
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
