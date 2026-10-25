import { DateTime } from "luxon";
import { NextResponse } from "next/server";
import { Timestamp } from "firebase-admin/firestore";
import { getFirestore, getAuth } from "@/services/firebase-admin";

const forbidden = () =>
  NextResponse.json({ error: "f0rb1DD3n!" }, { status: 401 });

// Saves the signed-in user's own ranking.
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const user = await getAuth().verifyIdToken(body.token);

    if (!user.email) {
      return forbidden();
    }

    await getFirestore()
      .collection("users")
      .doc(user.email)
      .set(
        {
          ranking: body.ranking,
          updatedAt: Timestamp.fromDate(DateTime.utc().toJSDate())
        },
        { merge: true }
      );

    return NextResponse.json({ result: "success!" });
  } catch {
    return forbidden();
  }
}
