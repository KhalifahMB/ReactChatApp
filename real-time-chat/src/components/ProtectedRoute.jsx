/* eslint-disable react/prop-types */
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import Welcome from "./Welcome";

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (!user) {
    return <Welcome />;
  }
  return children;
};

export default ProtectedRoute;
