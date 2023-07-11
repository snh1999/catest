import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SideMain from "./body/navtab/SideMain";
import AllTabs from "./body/navtab/TabContent";
import HeaderComponent from "./common/Header";
import { useState } from "react";
import { TabProps } from "./common/interfaces/TabProps";
import RequestTab from "./common/interfaces/Request";

export const drawerWidth = 240;

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

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
    const theme = useTheme();
    const [open, setOpen] = useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    // added code
    // const requests: string[] = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
    const [requestArr, setRequests] = useState<RequestTab[]>([]);

    const [activeTab, setActiveTab] = useState(0);
    const handleChange = (newValue: number) => {
        setActiveTab(newValue);
    };

    const prop: TabProps = {
        requestArr,
        handleChange,
        activeTab,
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <HeaderComponent toggleDrawerOpen={handleDrawerOpen} open={open} />

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
                <DrawerHeader>
                    Requests
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                {/* <SideMain /> */}

                <SideMain tabProps={prop} setRequests={setRequests} activeTab={activeTab} />
            </Drawer>
            <Main open={open}>
                <AllTabs activeTab={activeTab} itemArr={requestArr} />
            </Main>
        </Box>
    );
}
