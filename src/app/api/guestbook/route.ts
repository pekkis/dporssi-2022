import { DateTime } from "luxon";
import { NextResponse, type NextRequest } from "next/server";
import { v4 } from "uuid";
import { getAuth, getFirestore } from "@/services/firebase-admin";
import { GUESTBOOK_CLOSED } from "@/services/guestbook";
import { getGuestbookPosts } from "@/services/guestbook-posts";

// A page of posts: ?offset=&limit= (at most 100).
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const offset = parseInt(params.get("offset") ?? "", 10) || 0;
  const limit = parseInt(params.get("limit") ?? "", 10) || 10;

  if (limit > 100) {
    return NextResponse.json({ error: "Oh noes" }, { status: 400 });
  }

  return NextResponse.json(await getGuestbookPosts(offset, limit));
}

// A new post. Closed until the guestbook has working bot protection.
export async function POST(request: Request) {
  if (GUESTBOOK_CLOSED) {
    return NextResponse.json(
      { error: "Vieraskirja on suljettu." },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const store = getFirestore();
    const id = v4();

    await store.collection("guestbook").doc(id).set({
      id,
      author: body.author,
      scribbling: body.scribbling,
      date: DateTime.utc().toISO()
    });

    const stat = await store.collection("guestbook").doc("---stats---").get();
    await store
      .collection("guestbook")
      .doc("---stats---")
      .set({ totalPosts: (stat.data()?.totalPosts ?? 0) + 1 });

    return NextResponse.json({ result: "success!" });
  } catch {
    return NextResponse.json({ error: "f0rb1DD3n!" }, { status: 401 });
  }
}

// The chairman's reply to a post.
export async function PUT(request: Request) {
  const body = await request.json();
  const user = await getAuth().verifyIdToken(body.token);

  if (user?.email !== "puhemies@diktaattoriporssi.com") {
    return NextResponse.json({ error: "f0rb1DD3n!" }, { status: 401 });
  }

  await getFirestore()
    .collection("guestbook")
    .doc(body.id)
    .set({ reply: body.reply }, { merge: true });

  return NextResponse.json({ succetore: "grande" });
}
