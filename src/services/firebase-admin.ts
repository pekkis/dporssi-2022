import { apps } from "firebase-admin";
import { auth, firestore } from "firebase-admin";
import { cert, initializeApp, ServiceAccount } from "firebase-admin/app";

export const getApp = () => {
  if (apps.length > 0) {
    return apps[0];
  }

  const serviceAccount: ServiceAccount = {
    projectId: process.env.GOOGLE_PROJECT_ID,
    privateKey: Buffer.from(process.env.GOOGLE_PRIVATE_KEY!, "base64").toString(
      "utf-8"
    ),
    clientEmail: process.env.GOOGLE_CLIENT_EMAIL
  };

  console.log("SA", serviceAccount);

  const credential = cert(serviceAccount);

  return initializeApp({
    credential
  });
};

export const getFirestore = () => {
  getApp();
  return firestore();
};

export const getAuth = () => {
  getApp();
  return auth();
};
