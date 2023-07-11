import { useState } from "react";
import "./App.css";
import { ThemeProvider } from "@emotion/react";
import { createTheme, useMediaQuery } from "@mui/material";
import MainContent from "./MainContent";

// Define theme settings
const light = {
    palette: {
        mode: "light",
    },
};

const dark = {
    palette: {
        mode: "dark",
    },
};

function App() {
    // code for theme
    const preferedMode = useMediaQuery("(prefers-color-scheme: dark)");
    const [darkTheme, settheme] = useState(preferedMode);
    const initialTheme = createTheme({
        palette: {
            mode: darkTheme ? "dark" : "light",
        },
    });
    const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        settheme(event.target.checked);
    };

    return (
        <div className="container">
            <ThemeProvider theme={initialTheme}>
                <MainContent handleThemeChange={handleThemeChange} darkTheme={darkTheme} />
            </ThemeProvider>
        </div>
    );
}

export default App;
