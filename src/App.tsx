import { ThemeProvider, createTheme } from "@mui/material";
import MainBody from "./body/MainBody";
import useThemeStore from "./ts/store/themestore";

function App() {
    const isDarkTheme = useThemeStore((state) => state.isDarkTheme);
    const initialTheme = createTheme({
        palette: {
            mode: isDarkTheme ? "dark" : "light",
        },
    });

    return (
        <div className="container">
            <ThemeProvider theme={initialTheme}>
                <MainBody />
            </ThemeProvider>
        </div>
    );
}

export default App;
