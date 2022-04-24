import ReactCookieConsent from "react-cookie-consent";
import { Button } from "theme-ui";

const CookieConsent = () => {
  return (
    <ReactCookieConsent
      location="bottom"
      buttonText="Ymmärrän!"
      ButtonComponent={(props) => {
        const { style, ...rest } = props;
        return (
          <Button
            {...rest}
            sx={{
              flex: "0 0 auto",
              margin: "15px",
              padding: "5px 10px"
            }}
          />
        );
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
