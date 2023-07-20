import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import TabsHandler from "./mainContent/navtab/TabsHandler";
import HeaderComponent from "./common/Header";
import { useState } from "react";
import RequestTab from "./common/interfaces/RequestTab";
import ToggleSwitch from "./components/custom-toggle";
import RequestForm from "./mainContent/body/Requestform";
import RequestDataProvider from "./common/context/RequestContext";
import ResponseDataProvider from "./common/context/ResponseContext";

export const drawerWidth = 250;

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
    toggleDrawerOpen?: () => void;
};

export default function MainContent(props: MainContentProps) {
    const [open, setOpen] = useState(true);

    const toggleDrawerOpen = () => {
        setOpen(!open);
    };

    // added code
    const [requestTabs, setRequestTabs] = useState<RequestTab[]>([]);
    const [activeTab, setActiveTab] = useState(0);

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
                <DrawerHeaderComponent {...props} toggleDrawerOpen={toggleDrawerOpen} />
                <TabsHandler
                    {...{
                        requestTabs,
                        setActiveTab,
                        activeTab,
                        setRequestTabs: setRequestTabs,
                    }}
                />
            </Drawer>
            <Main
                open={open}
                sx={{
                    maxWidth: "900px",
                    margin: "0 auto 0 auto",
                }}
            >
                <RequestDataProvider>
                    <ResponseDataProvider>
                        <RequestForm />
                    </ResponseDataProvider>
                </RequestDataProvider>
                {/* <AllTabs activeTab={activeTab} requestArr={requestArr} /> */}
            </Main>
        </Box>
    );
}

function DrawerHeaderComponent(props: MainContentProps) {
    return (
        <DrawerHeader sx={{ display: "flex", justifyContent: "space-between" }}>
            <ToggleSwitch checked={props.darkTheme} onChange={(event) => props.handleThemeChange(event)} />
            Requests
            <IconButton onClick={props.toggleDrawerOpen}>
                <ChevronLeftIcon />
                {/* {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />} */}
            </IconButton>
        </DrawerHeader>
    );
}
