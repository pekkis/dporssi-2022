import { Formik, Form, Field, ErrorMessage } from "formik";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useEffect, useReducer } from "react";
import axios from "axios";
import ExternalLink from "./ExternalLink";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import * as Yup from "yup";
import Spinner from "./Spinner";
import SubHeading from "./SubHeading";
import Paragraph from "./Paragraph";
import { useUserStore } from "@/services/state";

const initialState = {
  isHuman: false,
  isPosting: false,
  isError: false,
  isSuccess: false
};

type State = typeof initialState;
type Action = "IS_HUMAN" | "POST" | "ERROR" | "SUCCESS";

const reducer = (state: State, action: Action): State => {
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

type ErrorBoxProps = { children: React.ReactNode };

const ErrorBox = ({ children }: ErrorBoxProps) => {
  return <div className="-mt-4 text-primary mb-4">{children}</div>;
};

const GuestbookForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isHuman, isPosting, isError, isSuccess } = state;

  const user = useUserStore((state) => state.user);

  const { executeRecaptcha } = useGoogleReCaptcha();
  useEffect(() => {
    const checkToken = async () => {
      if (!executeRecaptcha) {
        return;
      }

      console.log(process.env.NEXT_PUBLIC_API, "hihi haah");

      const url = `${process.env.NEXT_PUBLIC_API}/api/captcha`;
      const token = await executeRecaptcha("login_page");
      const ret = await axios.post(url, {
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
    <div className="p-4 border border-muted rounded">
      <SubHeading>Kirjoita vieraskirjaan</SubHeading>

      <Paragraph>
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
      </Paragraph>

      <Formik
        initialValues={{
          author: user?.data?.secretName || "",
          scribbling: ""
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          dispatch("POST");
          /*
          try {
            await axios.post(
              `${process.env.NEXT_PUBLIC_API}/api/guestbook`,
              values
            );

            dispatch("SUCCESS");
          } catch (e) {
            dispatch("ERROR");
          }
          */
        }}
      >
        {({ errors, isValid }) => {
          return (
            <Form className="mt-4">
              <label className="block font-bold mb-1 mt-2" htmlFor="author">
                Salanimi
              </label>
              <Field
                disabled={isPosting || isSuccess}
                name="author"
                type="text"
                as="input"
                className="border border-muted rounded p-2 w-full mb-2"
                placeholder="salanimi"
              />
              {errors.author && (
                <ErrorBox>
                  <ErrorMessage name="author" />
                </ErrorBox>
              )}

              <label className="block font-bold mb-1 mt-2" htmlFor="scribbling">
                Terveiset
              </label>
              <Field
                disabled={isPosting || isSuccess}
                name="scribbling"
                type="text"
                as="textarea"
                className="border border-muted rounded p-2 w-full mb-2"
                rows="8"
                placeholder="raapusta tähän terveisesi"
              />
              {errors.scribbling && (
                <ErrorBox>
                  <ErrorMessage name="scribbling" />
                </ErrorBox>
              )}

              {!isSuccess && !isError && (
                <>
                  <button
                    disabled={true}
                    type="submit"
                    className="bg-primary text-white rounded px-4 py-2 cursor-pointer disabled:opacity-50"
                  >
                    {isPosting && <Spinner />}
                    Anti mennä!
                  </button>

                  <strong>
                    Bottisuojaukseni on turhan kökkö joten tämä on disabloitu
                    kunnes saan sen korjattua.
                  </strong>
                </>
              )}
              {isSuccess && (
                <Paragraph className="italic">
                  Kiitos palautteesta! Se on jonossa käsiteltävänä, ja törähtää
                  tälle sivulle lähituntien aikana.
                </Paragraph>
              )}
              {isError && (
                <Paragraph className="italic">
                  Äh! Palautteen lähettäminen meni perseelleen. Yritä uudelleen
                  paremmalla onnella tai eri lailla formatoidulla palautteella!
                </Paragraph>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

const GuestbookFormWrapper = () => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_ID ?? ""}
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
