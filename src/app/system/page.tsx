import { Button, BaseButton, LongButton } from "@/shared/ui/button/button";
import {
	B1,
	B2,
	B3,
	B4,
	H1,
	H2,
	H3,
	H4,
	H5,
	H6,
	PlaceholderB1,
} from "@/shared/ui/text/text";

const DesignSystem = () => {
	return (
		<div className="flex flex-col items-start justify-start">
			Maintenance...
			<Button>Hi</Button>
			<BaseButton color="green">About me</BaseButton>
			<BaseButton color="gold">Projects</BaseButton>
			<BaseButton color="none">리뷰 남기기</BaseButton>
			<BaseButton color="none">Contact</BaseButton>
			<LongButton color="blue">리뷰 남기기</LongButton>
			<H1>This is English font</H1>
			<H1>한글 폰트입니다.</H1>
			<H2>This is English font</H2>
			<H2>한글 폰트입니다.</H2>
			<H3 weight="bold">This is English font</H3>
			<H3 weight="bold">한글 폰트입니다.</H3>
			<H4>This is English font</H4>
			<H4>한글 폰트입니다.</H4>
			<H5>This is English font</H5>
			<H5>한글 폰트입니다.</H5>
			<H6>This is English font</H6>
			<H6>한글 폰트입니다.</H6>
			<B1>This is English font</B1>
			<B1>한글 폰트입니다.</B1>
			<B2>This is English font</B2>
			<B2>한글 폰트입니다.</B2>
			<B3>This is English font</B3>
			<B3>한글 폰트입니다.</B3>
			<B4>This is English font</B4>
			<B4>한글 폰트입니다.</B4>
			<PlaceholderB1>This is English font</PlaceholderB1>
			<PlaceholderB1>한글 폰트입니다.</PlaceholderB1>
		</div>
	);
};
export default DesignSystem;
