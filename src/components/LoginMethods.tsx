"use client";

import { Box, Button } from "@/components/ui";
import { sprinkles } from "@/styles/sprinkles.css";
import * as styles from "./LoginMethods.css";
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
      <Box className={sprinkles({ my: 2 })}>
        <Button
          onClick={() => {
            const provider = new GoogleAuthProvider();
            signInWithPopup(auth, provider);
          }}
        >
          <FaGoogle className={styles.icon} />
          Kirjaudu Googlessa
        </Button>
      </Box>

      <Box className={sprinkles({ my: 2 })}>
        <Button
          disabled
          onClick={() => {
            const provider = new FacebookAuthProvider();
            signInWithPopup(auth, provider);
          }}
        >
          <FaFacebook className={styles.icon} />
          Kirjaudu Facebookissa
        </Button>
      </Box>
    </>
  );
};

export default LoginMethods;
