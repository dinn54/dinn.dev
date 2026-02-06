import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/shared/config/siteConfig";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-revalidate-secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const body = await req.json();
  const type: string = body.type;

  switch (type) {
    case "INSERT": {
      const slug = body.record.slug;
      revalidatePath(`/posts/${slug}`);
      fetch(`${siteConfig.url}/posts/${slug}`).catch(() => {});
      break;
    }
    case "UPDATE": {
      const slug = body.record.slug;
      const oldSlug = body.old_record.slug;
      revalidatePath(`/posts/${slug}`);
      if (oldSlug !== slug) {
        revalidatePath(`/posts/${oldSlug}`);
      }
      break;
    }
    case "DELETE": {
      const slug = body.old_record.slug;
      revalidatePath(`/posts/${slug}`);
      break;
    }
  }

  return NextResponse.json({ revalidated: true, type });
}
