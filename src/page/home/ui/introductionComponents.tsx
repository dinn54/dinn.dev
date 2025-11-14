import { B1, B3, H2 } from "@/shared/ui/text/text";
import { BaseButton } from "@/shared/ui/button";
import NextImageClient from "@/shared/ui/image/nextImageClient";

export const Tree = ({
  TreeContainerRef,
}: {
  TreeContainerRef: React.RefObject<HTMLDivElement | null>;
}) => {
  return (
    <div
      ref={TreeContainerRef}
      className="pc:h-full animate-fade-down-slow flex w-full justify-center"
    >
      <div className="relative z-[1] h-full w-full">
        <NextImageClient
          filePath={"/tree.png"}
          alt="tree"
          className="pc:opacity-100 h-full object-contain object-left opacity-0"
          priority
          fill
          fetchPriority="high"
        />
      </div>
    </div>
  );
};

export const Character = ({
  characterRef,
}: {
  characterRef: React.RefObject<HTMLDivElement | null>;
}) => {
  return (
    <div
      ref={characterRef}
      className="pc:block pc:right-10 absolute bottom-[2rem] z-[1] hidden aspect-square w-[7rem] transform"
    >
      <NextImageClient
        filePath={"/character2.svg"}
        alt="character"
        className="scale-x-[-1] object-contain"
        fill
      />
    </div>
  );
};

export const IntroductionText = () => {
  // const [isTextHovered, setIsTextHovered] = useState(false);
  return (
    <div className="pc:w-auto relative flex w-fit shrink-0 flex-col justify-center text-start font-semibold">
      <div className="flex flex-col justify-center text-gray-800">
        <H2>안녕하세요</H2>
        <H2>프론트엔드 개발자 주정혁입니다</H2>

        <p className="mt-14 flex flex-col">
          <B1>사용자 흐름을 고려한</B1>
          <B1>화면을 구성하고</B1>
        </p>
        <p className="mt-7 mb-14 flex flex-col">
          <B1>사용성과 완성도를 고려한</B1>
          <B1>세밀한 구현을 지향합니다.</B1>
        </p>

        <B3 className="text-neutral-500 italic">
          어떤 기술과 경험을 해왔는지 궁금하시다면 ↓
        </B3>

        <div className="pc:flex-row pc:gap-4 mt-4 flex w-full flex-col gap-3">
          <div className="flex gap-3">
            <BaseButton
              color="green"
              onClick={() => {
                const target = document.getElementById("about-section");
                if (target) {
                  target.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              <span className="text-p12 tab:text-p14 pc:text-p16">
                About me
              </span>
            </BaseButton>
            <BaseButton
              color="gold"
              onClick={() => {
                const target = document.getElementById("projects-section");
                if (target) {
                  target.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              <span className="text-p12 tab:text-p14 pc:text-p16">
                Projects
              </span>
            </BaseButton>
          </div>
          <div className="flex gap-3">
            <BaseButton
              color="none"
              onClick={() => {
                const target = document.getElementById("review-section");
                if (target) {
                  target.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              <span className="text-p12 tab:text-p14 pc:text-p16">
                리뷰 남기기
              </span>
            </BaseButton>
            <BaseButton
              color="none"
              onClick={() => {
                const target = document.getElementById("review-section");
                if (target) {
                  target.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              <span className="text-p12 tab:text-p14 pc:text-p16">Contact</span>
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  );
};
