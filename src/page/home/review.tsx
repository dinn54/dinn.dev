import { PageHeader } from "@/shared/ui/pageHeader";
import PageContainer from "./ui/page_container";

const Review = () => {
  return (
    <PageContainer id="contact-section" className="bg-[#f4f6ff] dark:bg-review-dark">
      <div className="flex flex-col w-full h-full justify-center items-center">
        <PageHeader title="Review" color="bg-review-light dark:bg-review-dark" />
      </div>
    </PageContainer>
  );
};
export default Review;
