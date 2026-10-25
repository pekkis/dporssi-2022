import ReactCookieConsent from "react-cookie-consent";
import { Button } from "@/components/ui";
import * as styles from "./CookieConsent.css";

const CookieConsent = () => {
  return (
    <ReactCookieConsent
      location="bottom"
      buttonText="Ymmärrän!"
      ButtonComponent={(props) => {
        const { style, ...rest } = props;
        return <Button {...rest} className={styles.button} />;
      }}
      buttonStyle={{}}
      cookieName="ValvontaKeksi"
      style={{ background: "#000", color: "rgb(255, 255, 255)" }}
      expires={360}
    >
      Diktaattoripörssi käyttää evästeitä vakoillakseen ja mahdollisesti myös
      vainotakseen minua.
    </ReactCookieConsent>
  );
};

export default CookieConsent;
