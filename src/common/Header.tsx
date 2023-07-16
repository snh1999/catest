import { Avatar, IconButton, Toolbar, Typography, styled } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { drawerWidth } from "../MainContent";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/logo.png";

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

type HeaderComponentProps = {
    toggleDrawerOpen: () => void;
    open: boolean;
};

export default function HeaderComponent(props: HeaderComponentProps) {
    const { toggleDrawerOpen, open } = props;
    return (
        <AppBar position="absolute" open={open}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawerOpen}
                    edge="start"
                    sx={{ mr: 2, ...(open && { display: "none" }) }}
                >
                    <MenuIcon />
                </IconButton>

                {/* <AdbIcon sx={{ mr: 1 }} /> */}
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                        mr: "auto",
                        ml: "auto",
                        // display: { xs: "none", md: "flex" },
                        fontFamily: "monospace",
                        fontWeight: 700,
                        letterSpacing: ".3rem",
                        color: "inherit",
                        textDecoration: "none",
                    }}
                >
                    <IconButton disabled>
                        <Avatar alt="catest" src={logo} sx={{ mr: 1 }} variant="rounded" />
                    </IconButton>
                    Catest
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
