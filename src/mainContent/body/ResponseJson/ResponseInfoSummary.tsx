import { Box, Chip } from "@mui/material";
import TimerIcon from "@mui/icons-material/Timer";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // successful-200
import CancelIcon from "@mui/icons-material/Cancel"; // error 400
import CloudOffIcon from "@mui/icons-material/CloudOff"; // 500 / server error
import ErrorIcon from "@mui/icons-material/Error"; // white 100/info,
import LaunchIcon from "@mui/icons-material/Launch"; // 300 -redirect
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { useContext } from "react";
import { ResponseContextType, ResponseDataContext } from "../../../common/context/ResponseContext";

enum COLOR_TYPE {
    PRIMARY = "primary",
    SECONDARY = "secondary",
    ERROR = "error",
    WARNING = "warning",
    INFO = "info",
    SUCCESS = "success",
}
function StatusIcon(statusCode: string): [COLOR_TYPE, JSX.Element] {
    if (statusCode.startsWith("2")) return [COLOR_TYPE.SUCCESS, <CheckCircleIcon color="success" />];
    else if (statusCode.startsWith("3")) return [COLOR_TYPE.PRIMARY, <LaunchIcon color="primary" />];
    else if (statusCode.startsWith("4")) return [COLOR_TYPE.ERROR, <CancelIcon color="error" />];
    else if (statusCode.startsWith("5")) return [COLOR_TYPE.WARNING, <CloudOffIcon color="warning" />];
    return [COLOR_TYPE.INFO, <ErrorIcon color="info" />];
}

function ResponseInfoSummary() {
    const { responseStats } = useContext(ResponseDataContext) as ResponseContextType;
    const [color, statusIcon] = StatusIcon(responseStats[0]);

    return (
        <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-start" }}>
            <Chip
                icon={statusIcon}
                color={color}
                // variant="outlined"
                sx={{ fontWeight: "bold" }}
                label={"Status: " + responseStats[0]}
            />
            <Box component="span" sx={{ padding: "0px 10px" }}>
                <Chip
                    icon={<TimerIcon />}
                    color={color}
                    sx={{ fontWeight: "bold" }}
                    variant="outlined"
                    label={"Time: " + responseStats[1] + " ms"}
                />
            </Box>
            <Chip
                icon={<QueryStatsIcon />}
                color={color}
                sx={{ fontWeight: "bold" }}
                variant="outlined"
                label={"Size: " + responseStats[2] + " bytes"}
            />
        </Box>
    );
}

export default ResponseInfoSummary;
