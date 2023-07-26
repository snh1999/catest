import { Box, IconButton } from "@mui/material";
import useActiveRequestStore from "../../../ts/store/activeRequestStore";
import ResponseInfoSummary from "./ResponseInfoSummary";
import ClearIcon from "@mui/icons-material/Clear";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import ResponseViewer from "./ResponseViewer";

export default function ActiveResponseViewer() {
    const { responseObject, cleanResponseObject, saveNewResponse } = useActiveRequestStore((store) => ({
        responseObject: store.responseObject,
        cleanResponseObject: store.cleanResponseObject,
        saveNewResponse: store.saveNewResponse,
    }));

    if (responseObject.responseStats !== "") {
        return (
            <>
                <Box sx={{ display: "flex" }}>
                    <ResponseInfoSummary {...responseObject} />
                    {/* // TODO - fix this later */}
                    <Box component="span" display="flex">
                        <IconButton onClick={() => saveNewResponse(responseObject)}>
                            <SaveAsIcon />
                        </IconButton>
                        <IconButton onClick={() => cleanResponseObject()}>
                            <ClearIcon />
                        </IconButton>
                    </Box>
                </Box>
                <ResponseViewer responseObject={responseObject} />
            </>
        );
    } else {
        return <></>;
    }
}
