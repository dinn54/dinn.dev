import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/shared/lib/supabase/server";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = createServerClient();

  const { data, error } = await supabase.rpc("increment_like_count", {
    post_id: id,
    delta: 1,
  });

  if (error) {
    console.error("[like] rpc error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ likeCount: data });
}
