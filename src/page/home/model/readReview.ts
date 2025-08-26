import { dbGetUserReviews } from "@/shared/model/dbActions";
import { createDBClient } from "@/shared/model/dbClient";

export const readReview = async () => {
  try {
    const data = await dbGetUserReviews(createDBClient());
    console.log("read", data);
    return data;
  } catch (e) {
    console.log(e);
  }
};
