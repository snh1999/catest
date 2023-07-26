import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppThemeState {
    isDarkTheme: boolean;
    toggleTheme: () => void;
}

// const useThemeStore = create<AppThemeState>()((set) => ({
//     isDarkTheme: true,
//     toggleTheme: () => set((state) => ({ isDarkTheme: !state.isDarkTheme })),
// }));

const useThemeStore = create<AppThemeState>()(
    persist(
        (set) => ({
            isDarkTheme: true,
            toggleTheme: () => set((state) => ({ isDarkTheme: !state.isDarkTheme })),
        }),
        {
            name: "themeStore",
        }
    )
);

export default useThemeStore;
