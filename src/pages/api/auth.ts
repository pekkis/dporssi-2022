import type { NextApiRequest, NextApiResponse } from "next";
import { DateTime } from "luxon";
import { getApp, getFirestore, getAuth } from "@/services/firebase-admin";
import { Timestamp } from "firebase-admin/firestore";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id, name },
    method
  } = req;

  switch (method) {
    case "POST":
      const app = getApp();
      const store = getFirestore();

      try {
        const user = await getAuth().verifyIdToken(req.body.token);

        console.log("USER", user);

        if (!user.email) {
          return res.status(401).json({
            error: "f0rb1DD3n!"
          });
        }

        const doc = await store.collection("users").doc(user.email).get();

        const now = DateTime.local();

        if (!doc.exists) {
          const doc2 = await store
            .collection("users")
            .doc(user.email)
            .set({
              createdAt: Timestamp.fromDate(now.toJSDate()),
              updatedAt: Timestamp.fromDate(now.toJSDate()),
              numberOfVotes: 1,
              ranking: []
            });

          return res.status(200).json({
            user: {
              ranking: [],
              numberOfVotes: 1
            }
          });
        }

        return res.status(200).json({
          user: doc?.data()
        });
      } catch (e) {
        return res.status(401).json({
          error: "f0rb1DD3n!"
        });
      }

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
