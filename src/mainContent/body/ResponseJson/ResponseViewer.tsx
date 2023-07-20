import { Box, IconButton } from "@mui/material";
import ResponseInfoSummary from "./ResponseInfoSummary";
import ResponseObject from "./ResponseObject";
import { useContext } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { ResponseContextType, ResponseDataContext } from "../../../common/context/ResponseContext";

function ResponseViewer() {
    const { responseStats, cleanResponse } = useContext(ResponseDataContext) as ResponseContextType;

    return (
        <>
            {/* <Box display={responseStats[0] === "" ? "none" : "block"}> */}
            <Box>
                <Box sx={{ display: "space-between", paddingRight: "50px" }}>
                    <ResponseInfoSummary />
                    {/* // TODO - fix this later */}
                    <IconButton onClick={() => cleanResponse()}>
                        <ClearIcon />
                    </IconButton>
                </Box>
                <ResponseObject />
            </Box>
        </>
    );
}

export default ResponseViewer;
