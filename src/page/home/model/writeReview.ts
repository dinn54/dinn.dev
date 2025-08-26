import { dbInsertUserReview } from "@/shared/model/dbActions";
import { createDBClient } from "@/shared/model/dbClient";
import { UserReview } from "@/shared/model/dbTypes";

export const writeReview = async (review: UserReview) => {
  try {
    const client = createDBClient();
    if (!client) throw new Error("Failed to create DB client");
    const { data, error } = await dbInsertUserReview(client, review);
    return { data, error };
  } catch (e) {
    console.log(e);
    throw e;
  }
};
