import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/shared/config/siteConfig";

interface RevalidateRecord {
  slug?: string;
  is_visible?: boolean;
  status?: string;
}

interface RevalidateBody {
  type: "INSERT" | "UPDATE" | "DELETE";
  record?: RevalidateRecord;
  old_record?: RevalidateRecord;
}

function warmPost(slug: string) {
  fetch(`${siteConfig.url}/posts/${encodeURIComponent(slug)}`).catch(() => {});
}

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-revalidate-secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const body: RevalidateBody = await req.json();
  const { type, record, old_record } = body;

  switch (type) {
    case "INSERT": {
      if (!record?.slug) break;
      revalidatePath(`/posts/${encodeURIComponent(record.slug)}`);
      revalidatePath("/posts");
      if (record.is_visible) warmPost(record.slug);
      break;
    }

    case "UPDATE": {
      const slug = record?.slug;
      const oldSlug = old_record?.slug;
      if (!slug) break;

      revalidatePath(`/posts/${encodeURIComponent(slug)}`);
      // Slug changed — also invalidate the old URL
      if (oldSlug && oldSlug !== slug) {
        revalidatePath(`/posts/${encodeURIComponent(oldSlug)}`);
      }
      revalidatePath("/posts");

      // Pre-warm only if the post is publicly visible
      if (record?.is_visible) warmPost(slug);
      break;
    }

    case "DELETE": {
      if (!old_record?.slug) break;
      revalidatePath(`/posts/${encodeURIComponent(old_record.slug)}`);
      revalidatePath("/posts");
      break;
    }
  }

  return NextResponse.json({ revalidated: true, type });
}
