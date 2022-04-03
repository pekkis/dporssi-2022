/** @jsx jsx */
import { Box, Button, jsx, Textarea, Input, Label } from "theme-ui";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useEffect, useReducer } from "react";
import axios from "axios";
import ExternalLink from "./ExternalLink";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import * as Yup from "yup";
import Spinner from "./Spinner";
import SubHeading from "./SubHeading";

const initialState = {
  isHuman: false,
  isPosting: false,
  isError: false,
  isSuccess: false
};

const reducer = (state, action) => {
  switch (action) {
    case "IS_HUMAN":
      return { ...state, isHuman: true };

    case "POST":
      return { ...state, isPosting: true };

    case "ERROR":
      return { ...state, isPosting: false, isError: true, isSuccess: false };

    case "SUCCESS":
      return { ...state, isPosting: false, isError: false, isSuccess: true };

    default:
      return state;
  }
};

const validationSchema = Yup.object().shape({
  author: Yup.string()
    .min(3, "Liian lyhyt!")
    .max(80, "Liian pitkä!")
    .required("Vaadittu kenttä!"),
  scribbling: Yup.string()
    .min(2, "Ei riitä!")
    .max(2000, "Liikaa!")
    .required("Vaadittu kenttä!")
});

const ErrorBox = ({ children }) => {
  return (
    <Box
      sx={{
        mt: -3,
        color: "primary",
        mb: 3
      }}
    >
      {children}
    </Box>
  );
};

const GuestbookForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isHuman, isPosting, isError, isSuccess } = state;

  const { executeRecaptcha } = useGoogleReCaptcha();
  useEffect(() => {
    const checkToken = async () => {
      if (!executeRecaptcha) {
        return;
      }

      const token = await executeRecaptcha("login_page");
      const ret = await axios.post(`${process.env.GATSBY_API}/captcha`, {
        token
      });

      const score = ret.data.score;

      if (score > 0.5) {
        dispatch("IS_HUMAN");
      }
    };

    checkToken();
  }, [executeRecaptcha]);

  return (
    <Box
      sx={{
        p: 3,
        borderWidth: 1,
        borderRadius: 1,
        borderStyle: "solid",
        borderColor: "muted"
      }}
    >
      <SubHeading>Kirjoita vieraskirjaan</SubHeading>

      <p>
        Palautelomaketta vahtii bottien hyökkäykseltä <strong>reCAPTCHA</strong>
        . Tämän sivun osalta voimassa ovat Diktaattoripörssin omien ehtojen
        lisäksi Googlen{" "}
        <ExternalLink to="https://policies.google.com/terms">
          käyttöehdot
        </ExternalLink>{" "}
        ja{" "}
        <ExternalLink to="https://policies.google.com/privacy">
          yksityisyyskäytännöt
        </ExternalLink>{" "}
        (LOL).
      </p>

      <Formik
        initialValues={{
          author: "",
          scribbling: ""
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          dispatch("POST");
          try {
            await axios.post(`${process.env.GATSBY_API}/guestbook`, values);

            dispatch("SUCCESS");
          } catch (e) {
            dispatch("ERROR");
          }
        }}
      >
        {({ errors, isValid }) => {
          return (
            <Form
              sx={{
                mt: 3
              }}
            >
              <Label htmlFor="author">Salanimi</Label>
              <Field
                disabled={isPosting || isSuccess}
                name="author"
                type="text"
                as={Input}
                placeholder="salanimi"
              />
              {errors.author && (
                <ErrorBox>
                  <ErrorMessage name="author" />
                </ErrorBox>
              )}

              <Label htmlFor="scribbling">Terveiset</Label>
              <Field
                disabled={isPosting || isSuccess}
                name="scribbling"
                type="text"
                as={Textarea}
                rows="8"
                placeholder="raapusta tähän terveisesi"
              />
              {errors.scribbling && (
                <ErrorBox>
                  <ErrorMessage name="scribbling" />
                </ErrorBox>
              )}

              {!isSuccess && !isError && (
                <Button
                  disabled={!isValid || !isHuman || isPosting || isSuccess}
                  type="submit"
                >
                  {isPosting && <Spinner />}
                  Anti mennä!
                </Button>
              )}
              {isSuccess && (
                <p sx={{ fontStyle: "italic" }}>
                  Kiitos palautteesta! Se on jonossa käsiteltävänä, ja törähtää
                  tälle sivulle lähituntien aikana.
                </p>
              )}
              {isError && (
                <p sx={{ fontStyle: "italic" }}>
                  Äh! Palautteen lähettäminen meni perseelleen. Yritä uudelleen
                  paremmalla onnella tai eri lailla formatoidulla palautteella!
                </p>
              )}
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

const GuestbookFormWrapper = () => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.GATSBY_RECAPTCHA_ID}
      language="fi"
      useRecaptchaNet={false}
      scriptProps={{
        async: false, // optional, default to false,
        defer: true, // optional, default to false
        appendTo: "head", // optional, default to "head", can be "head" or "body",
        nonce: undefined // optional, default undefined
      }}
    >
      <GuestbookForm />
    </GoogleReCaptchaProvider>
  );
};

export default GuestbookFormWrapper;
