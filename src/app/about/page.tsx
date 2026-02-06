import type { Metadata } from "next";
import AboutPage from "@/page/about";
import { siteConfig } from "@/shared/config/siteConfig";

export const metadata: Metadata = {
  title: "About",
  description: `“사용자가 어떻게 쓰면 편하게 사용할 수 있을까?”라는 질문을 염두하며 설계 와 구현을 진행하며, 실제로 가치 있는 사용자 경험를 제공할 수 있는 개발을 지향합니다.`,
  alternates: { canonical: "/about" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.author.name,
  jobTitle: siteConfig.author.role,
  url: siteConfig.url,
  sameAs: [siteConfig.author.github],
};

const About = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutPage />
    </>
  );
};
export default About;
