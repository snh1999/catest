import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import SideBarHeader from "./sidebar/SideBarHeader";
import MainHeader from "./MainHeader";
import SideBar from "./sidebar/Sidebar";
import MainContent from "./MainContent/MainContent";

export const drawerWidth = 300;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

export default function MainBody() {
    const [open, setOpen] = React.useState(true);

    const toggleDrawerOpen = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />

            <MainHeader toggleDrawerOpen={toggleDrawerOpen} open={open} title={"catest"} />
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <SideBarHeader toggleDrawerOpen={toggleDrawerOpen} />
                <SideBar />
            </Drawer>
            <Main open={open} sx={{ maxWidth: "1000px", margin: "0 auto", height: "100%", paddingTop: "60px" }}>
                <MainContent />
            </Main>
        </Box>
    );
}
