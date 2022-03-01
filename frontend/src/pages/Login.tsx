import React from "react";
import { Link } from "react-router-dom";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import SignInFrom from "../components/SignInForm";

function Login(): JSX.Element {
  const googleSuccess = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ): Promise<void> => {
    const res = response as GoogleLoginResponse;
    const profileObj = res?.profileObj;
    const token = res?.accessToken;

    console.log(profileObj, token);
  };

  const googleFailure = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ): void => {
    console.log(response);
  };

  return (
    <>
      <SignInFrom />
      <GoogleLogin
        clientId="853913000249-hbmvigouf2t3b0heg9noss90hk5l9g5b.apps.googleusercontent.com"
        buttonText="Sign in with Google"
        onSuccess={googleSuccess}
        onFailure={googleFailure}
        cookiePolicy="single_host_origin"
      />
      <Link to="/signup">Sign Up</Link>
    </>
  );
}

export default Login;
