import { FC, useEffect } from "react";
import { useUserStore } from "../services/state";
import { auth } from "../services/firebase";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";

const UserInitializer: FC = () => {
  const setUser = useUserStore((state) => state.setUser);
  const setToken = useUserStore((state) => state.setToken);
  const setData = useUserStore((state) => state.setData);

  useEffect(() => {
    onAuthStateChanged(auth, (ret) => {
      if (ret === null) {
        setUser({
          isAuthenticated: false,
          email: null,
          isInitialized: true,
          picture: null
        });
      } else {
        setUser({
          isAuthenticated: true,
          email: ret.email,
          isInitialized: true,
          picture: ret.photoURL
        });
      }

      ret?.getIdToken().then((token) => {
        setToken(token);

        axios.post(`/api/auth`, { token }).then((ret) => {
          setData(ret.data.user);
        });
      });
    });
  }, [setData, setToken, setUser]);

  return null;
};

export default UserInitializer;
