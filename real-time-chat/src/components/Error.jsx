import { useRouteError } from "react-router-dom";
import { auth } from "../firebase";

export default function ErrorPage() {
  const user = auth.currentUser;
  console.log(user);
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      {/* {user.displayName || "nouser"} */}
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
