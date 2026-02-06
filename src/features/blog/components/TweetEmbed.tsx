import { getTweet } from "react-tweet/api";
import { EmbeddedTweet } from "react-tweet";

interface TweetEmbedProps {
  tweetId: string;
  width?: number;
}

export async function TweetEmbed({ tweetId, width = 450 }: TweetEmbedProps) {
  const tweet = await getTweet(tweetId);

  if (!tweet) {
    return (
      <div
        className="my-8 flex items-center justify-center rounded-lg border border-slate-200 p-6 text-slate-500 dark:border-slate-700 dark:text-slate-400"
        style={{ width, maxWidth: "100%" }}
      >
        트윗을 불러올 수 없습니다.
      </div>
    );
  }

  return (
    <div
      className="my-8"
      style={{
        width,
        maxWidth: "100%",
      }}
    >
      <EmbeddedTweet tweet={tweet} />
    </div>
  );
}
