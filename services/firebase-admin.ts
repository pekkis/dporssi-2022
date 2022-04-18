import { apps } from "firebase-admin";
import { cert, initializeApp, ServiceAccount } from "firebase-admin/app";

export const getApp = () => {
  if (apps.length > 0) {
    console.log("apps", apps);
    return apps[0];
  }

  console.log("hihhei");

  const serviceAccount: ServiceAccount = {
    projectId: process.env.GOOGLE_PROJECT_ID,
    privateKey: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    clientEmail: process.env.GOOGLE_CLIENT_EMAIL
  };

  const credential = cert(serviceAccount);

  return initializeApp({
    credential
  });
};
