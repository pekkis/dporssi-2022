import ReactCookieConsent from "react-cookie-consent";

const CookieConsent = () => {
  return (
    <ReactCookieConsent
      location="bottom"
      buttonText="Ymmärrän!"
      ButtonComponent={(props) => {
        const { style, ...rest } = props;
        return (
          <button
            {...rest}
            className="flex-none bg-primary text-white cursor-pointer rounded px-[10px] py-[5px] m-[15px]"
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
