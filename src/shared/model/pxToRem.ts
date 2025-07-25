export const pxToRem = (px: number) => {
	return px / parseFloat(getComputedStyle(document.documentElement).fontSize);
};
