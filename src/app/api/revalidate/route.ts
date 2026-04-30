import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/shared/config/siteConfig";
import {
  BLOG_POSTS_CACHE_TAG,
  BLOG_TAGS_CACHE_TAG,
} from "@/features/blog/api/posts";

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

const WARM_TIMEOUT_MS = 3000;

async function warmPath(path: string) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), WARM_TIMEOUT_MS);

  try {
    await fetch(`${siteConfig.url}${path}`, {
      cache: "no-store",
      signal: controller.signal,
    });
  } catch {
    // Warming is best-effort; a failed warm should not fail the webhook.
  } finally {
    clearTimeout(timeoutId);
  }
}

async function warmBlogPaths(slug?: string) {
  const paths = ["/posts"];
  if (slug) {
    paths.push(`/posts/${encodeURIComponent(slug)}`);
  }

  await Promise.allSettled(paths.map((path) => warmPath(path)));
}

function revalidateBlogCollection() {
  revalidateTag(BLOG_POSTS_CACHE_TAG);
  revalidateTag(BLOG_TAGS_CACHE_TAG);
  revalidatePath("/posts");
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
      revalidateBlogCollection();
      if (record.is_visible) await warmBlogPaths(record.slug);
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
      revalidateBlogCollection();

      // Pre-warm only if the post is publicly visible
      if (record?.is_visible) await warmBlogPaths(slug);
      break;
    }

    case "DELETE": {
      if (!old_record?.slug) break;
      revalidatePath(`/posts/${encodeURIComponent(old_record.slug)}`);
      revalidateBlogCollection();
      await warmBlogPaths(old_record.slug);
      break;
    }
  }

  return NextResponse.json({ revalidated: true, type });
}
