import type { NextApiRequest, NextApiResponse } from "next";
import { DateTime } from "luxon";
import { getFirestore, getAuth } from "../../services/firebase-admin";

import { Timestamp } from "firebase-admin/firestore";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "POST":
      const store = getFirestore();

      try {
        const user = await getAuth().verifyIdToken(req.body.token);

        if (!user.email) {
          return res.status(401).json({
            error: "f0rb1DD3n!"
          });
        }

        const now = DateTime.utc();

        await store
          .collection("users")
          .doc(user.email)
          .set(
            {
              ranking: req.body.ranking,
              updatedAt: Timestamp.fromDate(now.toJSDate())
            },
            {
              merge: true
            }
          );

        return res.status(200).json({
          result: "success!"
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
