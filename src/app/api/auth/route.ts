import { DateTime } from "luxon";
import { NextResponse } from "next/server";
import { Timestamp } from "firebase-admin/firestore";
import { getFirestore, getAuth } from "@/services/firebase-admin";

const forbidden = () =>
  NextResponse.json({ error: "f0rb1DD3n!" }, { status: 401 });

// Signs a Firebase user in: returns their data, creating it on first login.
export async function POST(request: Request) {
  const store = getFirestore();

  try {
    const body = await request.json();
    const user = await getAuth().verifyIdToken(body.token);

    if (!user.email) {
      return forbidden();
    }

    const doc = await store.collection("users").doc(user.email).get();

    if (!doc.exists) {
      const now = DateTime.local();
      await store
        .collection("users")
        .doc(user.email)
        .set({
          createdAt: Timestamp.fromDate(now.toJSDate()),
          updatedAt: Timestamp.fromDate(now.toJSDate()),
          numberOfVotes: 1,
          ranking: []
        });

      return NextResponse.json({ user: { ranking: [], numberOfVotes: 1 } });
    }

    return NextResponse.json({ user: doc.data() });
  } catch {
    return forbidden();
  }
}
