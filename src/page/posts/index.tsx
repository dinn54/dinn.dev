import { PageHeader } from "@/shared/ui/pageHeader";
import StandalonePageContainer from "@/shared/ui/StandalonePageContainer";
import { PostList } from "@/features/blog/components/PostList";
import FixedLiftUpIcon from "@/shared/ui/FixedLiftUpIcon";

import { Post } from "@/features/blog/api/posts";

interface PostsPageProps {
  initialPosts: Post[];
  allTags: string[];
  selectedTag?: string;
}

const PostsPage = ({
  initialPosts,
  allTags,
  selectedTag,
}: PostsPageProps) => {
  return (
    <>
      <StandalonePageContainer>
        <PageHeader
          title="BLOG"
          color="border-b border-slate-200/70 bg-slate-50 dark:border-slate-800 dark:bg-slate-950"
        />
        <div className="flex h-full min-h-screen w-full flex-col">
          <div className="pc:flex-row tab:mt-[5.75rem] pc:mt-[10rem] tab:h-[calc(100%-6.25rem)] pc:h-[calc(100%-8.5rem)] pc:items-start pc:gap-22 max:px-[calc((100vw-90.063rem)*0.2)] mt-[5.5rem] flex h-[calc(100%-5.5rem)] w-full flex-col items-center gap-6">
            <div className="animate-in fade-in slide-in-from-bottom-4 relative flex h-full w-full flex-col duration-500">
              <PostList
                initialPosts={initialPosts}
                allTags={allTags}
                selectedTag={selectedTag}
              />
            </div>
          </div>
        </div>
      </StandalonePageContainer>
      <FixedLiftUpIcon targetId="app-scroll-container" />
    </>
  );
};

export default PostsPage;
