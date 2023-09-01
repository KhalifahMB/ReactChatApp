/* eslint-disable react/prop-types */

const RegisterForm = ({ register, setRegiter }) => {
  return (
    <div
      className={`
        containe ${!register ? "hidden" : ""}
      `}
      id="registration-form"
    >
      <form
        action="#"
        method="post"
        encType="multipart/form-data"
        onSubmit="handleRegister(this)"
      >
        <div className="names">
          <label htmlFor="firstname">First Name</label>
          <input type="text" required="true" id="firstname" />
          <label htmlFor="lastname">Last Name</label>
          <input type="text" id="lastname" />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" required="true" name="email" id="email" />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            required="true"
            name="password"
            id="password"
          />
        </div>
        <div className="image">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            name="image"
            id="image"
            accept=".jpg, .png"
            onChange="validateImage(this)"
          />
          <p id="image-error" className="error-message"></p>
        </div>
        <input type="submit" value="Register" />
      </form>
      <p id="login-link" onClick={() => setRegiter(false)}>
        Login
      </p>
    </div>
  );
};

export default RegisterForm;
