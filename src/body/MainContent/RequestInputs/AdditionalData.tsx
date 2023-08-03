import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";
import TabPanel from "../../../common/TabPanel";
import KeyValueInput from "./AdditionalData/KeyValueInput";
import useActiveRequestStore from "../../../ts/store/activeRequestStore";
import JSONInput from "./AdditionalData/JsonInput";
import SavedResponseViewer from "./SavedResponseViewer";
import FormInput from "./AdditionalData/FormInput";

export default function AdditionalData() {
    const { paramData, setParamData, headerData, setHeaderData, savedResponses, formData, setFormData } =
        useActiveRequestStore((store) => ({
            paramData: store.paramData,
            setParamData: store.setParamData,
            headerData: store.headerData,
            setHeaderData: store.setHeaderData,
            savedResponses: store.savedResponses,
            formData: store.formData,
            setFormData: store.setFormData,
        }));

    const [activeTab, setActiveTab] = useState(0);

    return (
        <Box sx={{ width: "100%" }}>
            <Tabs sx={{ paddingTop: "10px" }} value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
                <Tab sx={{ fontSize: "0.9rem", fontWeight: "bold" }} label="Params" key={0} />
                <Tab sx={{ fontSize: "0.9rem", fontWeight: "bold" }} label="Headers" key={1} />
                <Tab sx={{ fontSize: "0.9rem", fontWeight: "bold" }} label="Body" key={2} />
                <Tab sx={{ fontSize: "0.9rem", fontWeight: "bold" }} label="Form" key={3} />
                {savedResponses.length && (
                    <Tab sx={{ fontSize: "0.9rem", fontWeight: "bold" }} label="Saved Responses" key={4} />
                )}
            </Tabs>
            <TabPanel value={activeTab} index={0}>
                <KeyValueInput rows={paramData} setRow={setParamData} isHeader={false} />
            </TabPanel>
            <TabPanel value={activeTab} index={1}>
                <KeyValueInput rows={headerData} setRow={setHeaderData} isHeader={true} />
            </TabPanel>
            <TabPanel value={activeTab} index={2}>
                <JSONInput />
            </TabPanel>

            <TabPanel value={activeTab} index={3}>
                <FormInput rows={formData} setRow={setFormData} />
            </TabPanel>
            {savedResponses.length != 0 && (
                <TabPanel value={activeTab} index={4}>
                    {savedResponses.map((responseObject, index) => (
                        <SavedResponseViewer responseObject={responseObject} key={index} />
                    ))}
                </TabPanel>
            )}
        </Box>
    );
}
