import type { ComponentPropsWithRef } from "react";
import ReactCookieConsent from "react-cookie-consent";
import { Button } from "@/components/ui";
import * as styles from "./CookieConsent.css";

// react-cookie-consent's inline style is dropped in favour of our button.
const ConsentButton = ({
  style: _style,
  ...rest
}: ComponentPropsWithRef<"button">) => (
  <Button {...rest} className={styles.button} />
);

const CookieConsent = () => {
  return (
    <ReactCookieConsent
      location="bottom"
      buttonText="Ymmärrän!"
      ButtonComponent={ConsentButton}
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
