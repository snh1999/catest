import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";
import TabPanel from "../../../common/TabPanel";
import KeyValueInput from "./KeyValueInput";
import useActiveRequestStore from "../../../ts/store/activeRequestStore";
import JSONInput from "./JsonInput";
import SavedResponseViewer from "./SavedResponseViewer";

export default function AdditionalInputs() {
    const { paramData, setParamData, headerData, setHeaderData, savedResponses } = useActiveRequestStore((store) => ({
        paramData: store.paramData,
        setParamData: store.setParamData,
        headerData: store.headerData,
        setHeaderData: store.setHeaderData,
        savedResponses: store.savedResponses,
    }));

    const [activeTab, setActiveTab] = useState(0);

    return (
        <Box sx={{ width: "100%" }}>
            <Tabs sx={{ paddingTop: "10px" }} value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
                <Tab sx={{ fontSize: "0.9rem", fontWeight: "bold" }} label="Params" key={0} />
                <Tab sx={{ fontSize: "0.9rem", fontWeight: "bold" }} label="Headers" key={1} />
                <Tab sx={{ fontSize: "0.9rem", fontWeight: "bold" }} label="Body" key={2} />
                <Tab sx={{ fontSize: "0.9rem", fontWeight: "bold" }} label="Form" key={4} />
                {savedResponses.length && (
                    <Tab sx={{ fontSize: "0.9rem", fontWeight: "bold" }} label="Saved Responses" key={5} />
                )}
            </Tabs>
            <TabPanel value={activeTab} index={0}>
                <KeyValueInput rows={paramData} setRow={setParamData} />
            </TabPanel>
            <TabPanel value={activeTab} index={1}>
                <KeyValueInput rows={headerData} setRow={setHeaderData} />
            </TabPanel>
            <TabPanel value={activeTab} index={2}>
                <JSONInput />
            </TabPanel>

            <TabPanel value={activeTab} index={4}>
                <JSONInput />
            </TabPanel>
            {savedResponses.length != 0 && (
                <TabPanel value={activeTab} index={5}>
                    {savedResponses.map((responseObject, index) => (
                        <SavedResponseViewer responseObject={responseObject} key={index} />
                    ))}
                </TabPanel>
            )}
        </Box>
    );
}
