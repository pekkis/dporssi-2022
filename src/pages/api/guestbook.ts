import type { NextApiRequest, NextApiResponse } from "next";
import { DateTime } from "luxon";
import { getAuth, getFirestore } from "@/services/firebase-admin";
import { v4 } from "uuid";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  const store = getFirestore();

  const offset = parseInt(req.query.offset as string, 10) || 0;
  const limit = parseInt(req.query.limit as string, 10) || 10;

  if (!limit || limit > 100) {
    throw new Error("Oh noes");
  }

  switch (method) {
    case "PUT": {
      const user = await getAuth().verifyIdToken(req.body.token);

      if (user?.email !== "puhemies@diktaattoriporssi.com") {
        return res.status(401).json({
          error: "f0rb1DD3n!"
        });
      }

      await store.collection("guestbook").doc(req.body.id).set(
        {
          reply: req.body.reply
        },
        {
          merge: true
        }
      );

      return res.status(200).json({
        succetore: "grande"
      });
    }

    case "GET": {
      const docs = await store
        .collection("guestbook")
        .orderBy("date", "desc")
        .offset(offset)
        .limit(limit)
        .get();

      const stat = await store.collection("guestbook").doc("---stats---").get();
      const data = stat.data();

      return res.status(200).json({
        totalPosts: data.totalPosts,
        posts: docs.docs.map((d) => d.data())
      });
    }

    case "POST": {
      try {
        const now = DateTime.utc();
        const id = v4();

        const data = {
          id,
          author: req.body.author,
          scribbling: req.body.scribbling,
          date: now.toISO()
        };

        await store.collection("guestbook").doc(id).set(data);

        const stat = await store
          .collection("guestbook")
          .doc("---stats---")
          .get();

        await store
          .collection("guestbook")
          .doc("---stats---")
          .set({
            totalPosts: stat.data().totalPosts + 1
          });

        return res.status(200).json({
          result: "success!"
        });
      } catch (e) {
        return res.status(401).json({
          error: "f0rb1DD3n!"
        });
      }
    }

    default: {
      res.setHeader("Allow", ["GET", "POST", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
};

export default handler;
