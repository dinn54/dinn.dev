import { Tables, TablesInsert } from "@/shared/lib/supabase/types";

export enum DBTableName {
  UserReview = "dinn_reviews",
}

export type UserReviewDetail = Tables<"dinn_reviews">;

export type InsertUserReview = TablesInsert<"dinn_reviews">;

export type UserReview = Pick<
  UserReviewDetail,
  "nickname" | "contents" | "email"
>;
