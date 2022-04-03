/** @jsxImportSource theme-ui */
import { Box, Button, jsx } from "theme-ui";
import React, { FC } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { auth } from "../services/firebase";

import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithRedirect,
} from "firebase/auth";

const LoginMethods: FC = () => {
  return (
    <>
      <Box my={2}>
        <Button
          onClick={() => {
            const provider = new GoogleAuthProvider();
            signInWithRedirect(auth, provider);
          }}
        >
          <FaGoogle sx={{ mr: 2 }} />
          Kirjaudu Googlessa
        </Button>
      </Box>

      <Box my={2}>
        <Button
          onClick={() => {
            const provider = new FacebookAuthProvider();
            signInWithRedirect(auth, provider);
          }}
        >
          <FaFacebook sx={{ mr: 2 }} />
          Kirjaudu Facebookissa
        </Button>
      </Box>
    </>
  );
};

export default LoginMethods;
