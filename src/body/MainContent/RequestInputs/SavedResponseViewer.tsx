import { Box, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import ResponseInfoSummary from "../ResponseData/ResponseInfoSummary";
import { ResponseObject } from "../../../ts/types/response";
import ResponseViewer from "../ResponseData/ResponseViewer";

export default function SavedResponseViewer({ responseObject }: { responseObject: ResponseObject }) {
    return (
        <>
            <Box sx={{ display: "flex" }}>
                <ResponseInfoSummary {...responseObject} />
                {/* // TODO - fix this later */}
                <IconButton onClick={() => {}}>
                    {/* // delete request */}
                    <ClearIcon />
                </IconButton>
            </Box>
            <ResponseViewer responseObject={responseObject} />
        </>
    );
}
