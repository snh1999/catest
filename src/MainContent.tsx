import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TabsHandler from "./body/navtab/TabsHandler";
import AllTabs from "./body/navtab/TabContent";
import HeaderComponent from "./common/Header";
import { useState } from "react";
import { TabProps } from "./common/interfaces/TabProps";
import RequestTab from "./common/interfaces/Request";
import ToggleSwitch from "./components/custom-toggle";

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

type MainContentProps = {
    handleThemeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    darkTheme: boolean;
};

export default function MainContent(props: MainContentProps) {
    const theme = useTheme();
    const [open, setOpen] = useState(true);

    const toggleDrawerOpen = () => {
        setOpen(!open);
    };

    // added code
    const [requestArr, setRequests] = useState<RequestTab[]>([]);

    const [activeTab, setActiveTab] = useState(0);
    const handleChange = (newValue: number) => {
        setActiveTab(newValue);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <HeaderComponent toggleDrawerOpen={toggleDrawerOpen} open={open} />
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
                <DrawerHeader sx={{ display: "flex", justifyContent: "space-between" }}>
                    <ToggleSwitch checked={props.darkTheme} onChange={(event) => props.handleThemeChange(event)} />
                    Requests
                    <IconButton onClick={toggleDrawerOpen}>
                        {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                {/* <Divider /> */}
                <TabsHandler
                    {...{
                        requestArr,
                        handleChange,
                        activeTab,
                        setRequests,
                    }}
                />
            </Drawer>
            <Main open={open}>
                <AllTabs activeTab={activeTab} requestArr={requestArr} />
            </Main>
        </Box>
    );
}
