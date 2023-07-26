import { Box, IconButton, Tab, Tabs } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import ResponseInfoSummary from "../ResponseData/ResponseInfoSummary";
import { ProcessedRequestData, ResponseObject } from "../../../ts/types/response";
import ResponseViewer from "../ResponseData/ResponseViewer";
import { useState } from "react";
import TabPanel from "../../../common/TabPanel";
import RecordTableViewer from "../../../common/RecordTableViewer";
import JsonView from "../../../common/JsonView";

// add 2tabs - request, response
export default function SavedResponseViewer({ responseObject }: { responseObject: ResponseObject }) {
    const [activeTab, setActiveTab] = useState(0);
    const requestData = responseObject.requestData;

    return (
        <Box sx={{ border: "1px solid", margin: "5px", padding: "5px", borderRadius: "5px" }}>
            <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
                <Tab sx={{ fontSize: "0.9rem", fontWeight: "bold" }} label="Response" key={0} />
                {requestData && <Tab sx={{ fontSize: "0.9rem", fontWeight: "bold" }} label="Request" key={1} />}
            </Tabs>
            <TabPanel value={activeTab} index={0}>
                <ResponseData responseObject={responseObject} />
            </TabPanel>
            {requestData && (
                <TabPanel value={activeTab} index={1}>
                    <RequestData requestData={requestData} />
                </TabPanel>
            )}
        </Box>
    );
}

function ResponseData({ responseObject }: { responseObject: ResponseObject }) {
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

function RequestData({ requestData }: { requestData: ProcessedRequestData }) {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <>
            <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
                <Tab sx={{ fontSize: "0.9rem", fontWeight: "bold" }} label="Header" key={0} />
                <Tab sx={{ fontSize: "0.9rem", fontWeight: "bold" }} label="Param" key={1} />
                <Tab sx={{ fontSize: "0.9rem", fontWeight: "bold" }} label="Request Body" key={2} />
            </Tabs>
            <TabPanel value={activeTab} index={0}>
                <RecordTableViewer recordObject={requestData.header} />
            </TabPanel>
            <TabPanel value={activeTab} index={1}>
                <RecordTableViewer recordObject={requestData.params} />
            </TabPanel>

            <TabPanel value={activeTab} index={2}>
                <JsonView jsonString={JSON.stringify(requestData.bodyObj)} />
            </TabPanel>
        </>
    );
}
