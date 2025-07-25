import { create } from "zustand";

type Theme = {
	darkMode: boolean;
	toggle: () => void;
};

const useStore = create<Theme>()((set) => ({
	darkMode: false,
	toggle: () => set((state) => ({ darkMode: !state.darkMode })),
}));

export const useThemeToggle = () => {
	const { darkMode, toggle } = useStore();
	return { darkMode, toggle };
};
