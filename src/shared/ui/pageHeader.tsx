import { PageHeaderProjectArrow } from "./pageHeaderProjectArrow";
import { H1 } from "./text/text";

export const PageHeader = ({
  title,
  color,
}: {
  title: string;
  color: string;
}) => {
  return (
    <div className="absolute inset-0 flex h-fit w-full shrink-0 justify-center overflow-x-hidden">
      <div
        className={`tab:h-[10rem] pc:h-[13rem] relative flex h-[9rem] w-full ${color} darkMode-animate max-w-[1440px]`}
      >
        <div className="tab:left-10 pc:left-0 tab:w-[calc(100%-2.5rem)] pc:w-full absolute bottom-5 left-0 flex w-[calc(100%-1.5rem)] items-center gap-4">
          <H1 className="shrink-0 pl-[clamp(2rem,6vw,7rem)]">{title}</H1>
          <PageHeaderProjectArrow />
        </div>
      </div>
    </div>
  );
};
