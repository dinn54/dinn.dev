import { SupabaseClient } from "@supabase/supabase-js";
import { DBTableName } from "./dbTypes";

// GET
export async function dbGetUserReviews(supabase: SupabaseClient) {
  const { data, error, count } = await supabase
    .from(DBTableName.UserReview)
    .select("*");

  return { data, error, count };
}

// POST
export async function dbInsertUserReview(
  supabase: SupabaseClient,
  review: { content: string },
) {
  const { data, error } = await supabase
    .from(DBTableName.UserReview)
    .insert(review);

  return { data, error };
}
