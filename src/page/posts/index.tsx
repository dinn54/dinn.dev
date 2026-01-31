import { PageHeader } from "@/shared/ui/pageHeader";
import PageContainer from "@/page/home/ui/page_container";
import { PostList } from "@/features/blog/components/PostList";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

import { Post } from "@/features/blog/api/posts";

interface PostsPageProps {
  initialPosts: Post[];
  allTags: string[];
  initialSelectedTags: string[];
}

const PostsPage = ({
  initialPosts,
  allTags,
  initialSelectedTags,
}: PostsPageProps) => {
  return (
    <PageContainer>
      <div className="flex h-full w-full flex-col">
        <PageHeader title="BLOG" color="bg-blog-light dark:bg-blog-dark" />
        <div className="pc:flex-row tab:mt-[5.75rem] pc:mt-[10rem] tab:h-[calc(100%-6.25rem)] pc:h-[calc(100%-8.5rem)] pc:items-start pc:gap-22 max:px-[calc((100vw-90.063rem)*0.2)] mt-[5.5rem] flex h-[calc(100%-5.5rem)] w-full flex-col items-center gap-6">
          <div className="animate-in fade-in slide-in-from-bottom-4 relative flex h-full w-full flex-col duration-500">
            <div className="tab:mb-14 pc:mt-0 mt-10 mb-10">
              <TextGenerateEffect
                words={"구현에 대한 고민과 방법을 기록합니다."}
                className="tab:text-xl max-w-2xl text-lg leading-relaxed font-medium text-slate-700 dark:text-slate-300"
              />
              <PostList
                initialPosts={initialPosts}
                allTags={allTags}
                initialSelectedTags={initialSelectedTags}
              />
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default PostsPage;
