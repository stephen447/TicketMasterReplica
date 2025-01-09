import { JSX } from "react";
import { useState } from "react";

export default function CreateAccountPage(): JSX.Element {
  const [error, setError] = useState("");

  /**
   * This function is called when the sign up button is clicked
   */
  function handleSignUp() {
    // Add functionality to sign up the user
    console.log("Sign Up");
    // NEED TO DO ERROR HANDLING HERE
  }

  /**
   * This function is called when the sign in button is clicked
   */
  function handleSignIn() {
    // Add functionality to sign in the user
    console.log("Sign In");
  }

  return (
    <div>
      <p>Create Account</p>
      <label htmlFor="email">Email:</label>
      <input type="text" id="email" name="email" />
      <label htmlFor="password">Password:</label>
      <input type="text" id="password" />
      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input type="text" id="confirmPassword" />
      <label htmlFor="firstName">First Name:</label>
      <input type="text" id="firstName" />
      <label htmlFor="lastName">Last Name:</label>
      <input type="text" id="lastName" />
      <label htmlFor="countryOfResidence"> Country Of Residence</label>
      <input type="text" id="countryOfResidence" />
      <button onClick={handleSignUp}>Sign Up</button>
      {error && <p>{error}</p>}
      <p> Already have an account?</p>
      <button onClick={handleSignIn}> Sign In</button>
    </div>
  );
}
