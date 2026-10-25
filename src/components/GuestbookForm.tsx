"use client";

import type { ReactNode } from "react";
import { Box, Button, Textarea, Input, Label } from "@/components/ui";
import * as styles from "./GuestbookForm.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useEffect, useReducer } from "react";
import axios from "axios";
import ExternalLink from "./ExternalLink";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import * as Yup from "yup";
import Spinner from "./Spinner";
import SubHeading from "./SubHeading";
import { useUserStore } from "@/services/state";
import { GUESTBOOK_CLOSED } from "@/services/guestbook";

const initialState = {
  isHuman: false,
  isPosting: false,
  isError: false,
  isSuccess: false
};

type FormState = typeof initialState;
type FormAction = "IS_HUMAN" | "POST" | "ERROR" | "SUCCESS";

const reducer = (state: FormState, action: FormAction): FormState => {
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

const ErrorBox = ({ children }: { children: ReactNode }) => {
  return <Box className={styles.error}>{children}</Box>;
};

const GuestbookForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isHuman, isPosting, isError, isSuccess } = state;

  const user = useUserStore((store) => store.user);

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
    <Box className={styles.box}>
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
          author: user?.data?.secretName || "",
          scribbling: ""
        }}
        validationSchema={validationSchema}
        onSubmit={async () => {
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
            <Form className={styles.form}>
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
                <>
                  <Button
                    disabled={
                      GUESTBOOK_CLOSED ||
                      !isValid ||
                      !isHuman ||
                      isPosting ||
                      isSuccess
                    }
                    type="submit"
                  >
                    {isPosting && <Spinner />}
                    Anti mennä!
                  </Button>

                  <strong>
                    Bottisuojaukseni on turhan kökkö joten tämä on disabloitu
                    kunnes saan sen korjattua.
                  </strong>
                </>
              )}
              {isSuccess && (
                <p className={styles.notice}>
                  Kiitos palautteesta! Se on jonossa käsiteltävänä, ja törähtää
                  tälle sivulle lähituntien aikana.
                </p>
              )}
              {isError && (
                <p className={styles.notice}>
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
