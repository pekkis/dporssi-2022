import { IconContext } from "react-icons";
import { Context as ResponsiveContext } from "react-responsive";
import { I18nextProvider } from "react-i18next";
import i18n from "../services/i18n";
import App from "../components/App";

const values = { style: { verticalAlign: "middle" } };

/*
export const wrapRootElement = ({ element }) => {
  return (
    <IconContext.Provider value={values}>
      <ResponsiveContext.Provider value={{ width: 1024 }}>
        <I18nextProvider i18n={i18n}>
          <App>{element}</App>
        </I18nextProvider>
      </ResponsiveContext.Provider>
    </IconContext.Provider>
  );
};
*/

function MyApp({ Component, pageProps }) {
  return (
    <>
    <link rel="stylesheet" href="https://use.typekit.net/iwl1gmh.css"></link>
    
    <IconContext.Provider value={values}>
      <ResponsiveContext.Provider value={{ width: 1024 }}>
        <I18nextProvider i18n={i18n}>
          <App>

            
            <Component {...pageProps} />
          </App>
        </I18nextProvider>
      </ResponsiveContext.Provider>
    </IconContext.Provider>
    </>
  );
}

export default MyApp;
