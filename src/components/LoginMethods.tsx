import { Box } from "@/components/styled/Box";
import { Button } from "@/components/styled/Button";
import { FC } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { auth } from "@/services/firebase";
import { sprinkles } from "@/styles/sprinkles.css";

import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup
} from "firebase/auth";

const buttonIcon = sprinkles({ mr: "2" });

const LoginMethods: FC = () => {
  return (
    <>
      <Box my="2">
        <Button
          onClick={() => {
            const provider = new GoogleAuthProvider();
            signInWithPopup(auth, provider);
          }}
        >
          <FaGoogle className={buttonIcon} />
          Kirjaudu Googlessa
        </Button>
      </Box>

      <Box my="2">
        <Button
          disabled
          onClick={() => {
            const provider = new FacebookAuthProvider();
            signInWithPopup(auth, provider);
          }}
        >
          <FaFacebook className={buttonIcon} />
          Kirjaudu Facebookissa
        </Button>
      </Box>
    </>
  );
};

export default LoginMethods;
