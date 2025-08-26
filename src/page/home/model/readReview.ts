import { dbGetUserReviews } from "@/shared/model/dbActions";
import { createDBClient } from "@/shared/model/dbClient";

export const readReview = async () => {
  try {
    const client = createDBClient();
    if (!client) throw new Error("Failed to create DB client");
    const data = await dbGetUserReviews(client);
    console.log("read", data);
    return data;
  } catch (e) {
    console.log(e);
  }
};
