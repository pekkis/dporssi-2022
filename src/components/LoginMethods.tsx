import { FC } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { auth } from "@/services/firebase";

import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup
} from "firebase/auth";

const LoginMethods: FC = () => {
  return (
    <>
      <div className="my-2">
        <button
          className="bg-primary text-white rounded px-4 py-2 cursor-pointer"
          onClick={() => {
            const provider = new GoogleAuthProvider();
            signInWithPopup(auth, provider);
          }}
        >
          <FaGoogle className="mr-2 inline" />
          Kirjaudu Googlessa
        </button>
      </div>

      <div className="my-2">
        <button
          disabled
          className="bg-primary text-white rounded px-4 py-2 cursor-pointer disabled:opacity-50"
          onClick={() => {
            const provider = new FacebookAuthProvider();
            signInWithPopup(auth, provider);
          }}
        >
          <FaFacebook className="mr-2 inline" />
          Kirjaudu Facebookissa
        </button>
      </div>
    </>
  );
};

export default LoginMethods;
