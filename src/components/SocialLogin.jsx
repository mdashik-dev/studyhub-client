import React, { useContext } from "react";
import { FaGithub, FaGofore } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from "sweetalert2";

function SocialLogin() {
  const { loginWithGoogle, loginWithGithub, login } = useContext(AuthContext);

  const handleGoogleLogin = async () => {
    try {
      Swal.fire({
        title: "Logging in...",
        text: "Please wait while we log you in with Google.",
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });

      const result = await loginWithGoogle();
      if (result?.user?.providerData[0]?.uid) {
        const data = {
          provider: result.user.providerData[0],
          email: result.user.email,
        };
        login(data);
      }
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: `Welcome, ${result.user.displayName}!`,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
      });
    }
  };

  const handleGithubLogin = async () => {
    try {
      Swal.fire({
        title: "Logging in...",
        text: "Please wait while we log you in with GitHub.",
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });

      const result = await loginWithGithub();
      if (result?.user?.providerData[0]?.uid) {
        const data = {
          provider: result.user.providerData[0],
          email: result.user.email,
        };
        login(data);
      }
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: `Welcome, ${result.user.displayName}!`,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
      });
    }
  };

  return (
    <div className="mt-4 text-center">
      <p className="text-sm text-gray-600">Or login with</p>
      <div className="mt-3 space-x-3">
        <button
          className="inline-flex gap-3 items-center px-4 py-2 text-white bg-gray-800 rounded-full shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          onClick={handleGoogleLogin}
        >
          <FaGofore />
          Google
        </button>
        <button
          className="inline-flex gap-3 items-center px-4 py-2 text-white bg-black rounded-full shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
          onClick={handleGithubLogin}
        >
          <FaGithub />
          GitHub
        </button>
      </div>
    </div>
  );
}

export default SocialLogin;
