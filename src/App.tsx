import { useState } from "react";
import "./App.css";
import { ThemeProvider } from "@emotion/react";
import { createTheme, useMediaQuery } from "@mui/material";
import SideMain from "./body/navtab/SideMain";
import HideAppBar from "./common/Header";
import PersistentDrawerLeft from "./Drawer";

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
    const [theme, settheme] = useState(preferedMode);
    const initialTheme = createTheme({
        palette: {
            mode: theme ? "dark" : "light",
        },
    });
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        settheme(event.target.checked);
    };

    return (
        <div className="container">
            <ThemeProvider theme={initialTheme}>
                {/* <ThemeChangeSwitch checked={theme} onChange={handleChange} /> */}
                {/* <TabContainer /> */}
                {/* <HideAppBar children={<VerticalTabs />} /> */}
                {/* <TabPanel /> */}
                <PersistentDrawerLeft />
                {/* <SideMain /> */}
            </ThemeProvider>
        </div>
    );
}

export default App;
