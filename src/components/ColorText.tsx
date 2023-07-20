import { Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // successful-200
import CancelIcon from "@mui/icons-material/Cancel"; // error 400
import CloudOffIcon from "@mui/icons-material/CloudOff"; // 500 / server error
import ErrorIcon from "@mui/icons-material/Error"; // white 100/info,
import LaunchIcon from "@mui/icons-material/Launch"; // 300 -redirect

export enum COLOR_TYPE {
    PRIMARY = "primary",
    SECONDARY = "secondary",
    ERROR = "error",
    WARNING = "warning",
    INFO = "info",
    SUCCESS = "success",
}

type ColorProp = {
    color: COLOR_TYPE;
    text: string;
};

export default function ColorText(props: ColorProp) {
    const { color, text } = props;
    return (
        <Box
            component="span"
            sx={{
                bgcolor: color + ".main",
                color: "success.contrastText",
                padding: "1px 5px",
                borderRadius: 1,
            }}
        >
            {text}
        </Box>
    );
}
