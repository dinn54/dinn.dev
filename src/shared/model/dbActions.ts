import { SupabaseClient } from "@supabase/supabase-js";
import { DBTableName, InsertUserReview, UserReviewDetail } from "./dbTypes";

// GET
export async function dbGetUserReviews(supabase: SupabaseClient) {
  const { data, error, count } = await supabase
    .from(DBTableName.UserReview)
    .select("nickname, contents, email");

  const reviews = (data as UserReviewDetail[]) ?? [];
  return { reviews, error, count };
}

// POST
export async function dbInsertUserReview(
  supabase: SupabaseClient,
  review: InsertUserReview,
) {
  const { data, error } = await supabase
    .from(DBTableName.UserReview)
    .insert(review);

  return { data, error };
}
