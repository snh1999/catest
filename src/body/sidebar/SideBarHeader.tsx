import { IconButton, styled } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import ThemeToggleSwitch from "./ThemeToggle";
import useThemeStore from "../../ts/store/themestore";

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));

export default function SideBarHeader({ toggleDrawerOpen }: { toggleDrawerOpen?: () => void }) {
    const { isDarkTheme, toggleTheme } = useThemeStore();

    return (
        <DrawerHeader sx={{ display: "flex", justifyContent: "space-between" }}>
            <ThemeToggleSwitch checked={isDarkTheme} onChange={(_) => toggleTheme()} />
            Requests
            <IconButton onClick={toggleDrawerOpen}>
                <ChevronLeftIcon />
            </IconButton>
        </DrawerHeader>
    );
}
