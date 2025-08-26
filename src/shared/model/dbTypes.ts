export enum DBTableName {
  UserReview = "user_review",
}

export type UserReviewDetail = {
  id: number;
  nickname: string;
  contents: string;
  email: string;
  created_at: string;
  deleted_at: string;
};

export type InsertUserReview = Omit<
  UserReviewDetail,
  "id" | "created_at" | "deleted_at"
>;

export type UserReview = InsertUserReview;
