import { Badge, Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import TabPanel from "../../../common/TabPanel";
import HeaderTab from "./ResponseHeader";
import ResponseBody from "./ResponseBody";
import { ResponseObject } from "../../../ts/types/response";

export default function ResponseViewer({ responseObject }: { responseObject: ResponseObject }) {
    const [activeTab, setActiveTab] = useState(0);
    const response = JSON.stringify(responseObject.body, null, 2);

    if (responseObject.responseStats !== "") {
        return (
            <Box sx={{ width: "100%", paddingTop: "10px" }}>
                <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
                    <Tab sx={{ fontSize: "0.9rem", fontWeight: "bold" }} label="Response" id="0" />
                    <Tab
                        sx={{ fontSize: "0.9rem", fontWeight: "bold" }}
                        label={
                            <Badge
                                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                badgeContent={Object.keys(responseObject.header).length}
                            >
                                Header
                            </Badge>
                        }
                        id="1"
                    />
                </Tabs>
                <TabPanel value={activeTab} index={0}>
                    <ResponseBody response={response} />
                </TabPanel>
                <TabPanel value={activeTab} index={1}>
                    <HeaderTab responseHeader={responseObject.header} />
                </TabPanel>
            </Box>
        );
    } else {
        return <></>;
    }
}
