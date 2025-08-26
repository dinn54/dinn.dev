import { dbInsertUserReview } from "@/shared/model/dbActions";
import { createDBClient } from "@/shared/model/dbClient";
import { UserReview } from "@/shared/model/dbTypes";

export const writeReview = async (review: UserReview) => {
  try {
    const { data, error } = await dbInsertUserReview(createDBClient(), review);
    return { data, error };
  } catch (e) {
    console.log(e);
    throw e;
  }
};
