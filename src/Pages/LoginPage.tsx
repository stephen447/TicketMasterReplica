import { JSX } from "react";
import Footer from "../Components/Footer";

export default function LoginPage(): JSX.Element {
  /**
   * Sends requestion to the backend to sign in
   */
  function handleSignIn() {
    console.log("Sign In");
  }
  /**
   * Sends requestion to the backend, the send reset password link to the user
   * @returns void
   */
  function handleForgotPassword() {
    console.log("Forgot Password");
  }

  return (
    <div>
      <p>Login</p>
      <label htmlFor="username">Username:</label>
      <input type="text" id="username" name="username" />
      <label htmlFor="password">Password:</label>
      <input type="text" id="password" name="password" />
      {/* Add toggle to make password disappear */}
      <button onClick={handleForgotPassword}> Forgot Password</button>
      <button onClick={handleSignIn}> Sign In</button>
      <Footer />
    </div>
  );
}
