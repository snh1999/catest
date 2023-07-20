import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "../../common/TabPanel";
import { useContext, useState } from "react";
import InputJson from "../../components/InputJson";
import ResponseViewer from "./ResponseJson/ResponseViewer";
import InputList from "../../components/InputList";
import { RequestContextType, RequestDataContext } from "../../common/context/RequestContext";
import { Divider } from "@mui/material";

export default function BodyTabs() {
    const { paramData, setParamData, headerData, setHeaderData } = useContext(RequestDataContext) as RequestContextType;

    const [value, setValue] = useState(0);

    return (
        <Box sx={{ width: "100%" }}>
            <Tabs sx={{ paddingTop: "10px" }} value={value} onChange={(_, newValue) => setValue(newValue)}>
                <Tab sx={{ fontSize: "0.9rem", fontWeight: "bold" }} label="Params" key={0} />
                <Tab sx={{ fontSize: "0.9rem", fontWeight: "bold" }} label="Headers" key={1} />
                <Tab sx={{ fontSize: "0.9rem", fontWeight: "bold" }} label="Body" key={2} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <InputList rows={paramData} setRow={setParamData} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <InputList rows={headerData} setRow={setHeaderData} />
                <Divider sx={{ width: "100%" }} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <InputJson />
            </TabPanel>
            <ResponseViewer />
        </Box>
    );
}
