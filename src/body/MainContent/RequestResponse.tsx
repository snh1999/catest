import { Box, Divider } from "@mui/material";
import RequestBasicInputs from "./RequestInputs/RequestBasicInputs";
import AdditionalInputs from "./RequestInputs/AdditionalInputs";
import ActiveResponseViewer from "./ResponseData/ActiveResponseViewer";

export default function RequestResponseBody() {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <Box sx={{ flex: "1 1 40%" }}>
                <RequestBasicInputs />
                <AdditionalInputs />
            </Box>
            <Divider />

            <Box sx={{ flex: "1 1 40%", paddingTop: "3%" }}>
                <ActiveResponseViewer />
            </Box>
        </Box>
    );
}
