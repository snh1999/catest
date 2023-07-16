import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "../../common/TabPanel";
import { useContext, useState } from "react";
import InputJson from "../../components/InputJson";
import ResponseJson from "../../components/ResponseJson";
import InputList from "../../components/InputList";
import { KeyValue } from "../../common/interfaces/KeyValue";
import { RequestContextType, RequestDataContext } from "../../common/context/RequestContext";

type BodyProps = {
    // paramData: Record<string, string>;
    paramData: KeyValue[];
    setParamData: React.Dispatch<React.SetStateAction<KeyValue[]>>;
    headerData: KeyValue[];
    setHeaderData: React.Dispatch<React.SetStateAction<KeyValue[]>>;
};

export default function BodyTabs() {
    const { paramData, setParamData, headerData, setHeaderData } = useContext(RequestDataContext) as RequestContextType;

    const [value, setValue] = useState(0);

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    textColor="inherit"
                    onChange={(_, newValue) => setValue(newValue)}
                    sx={{ margin: "0 auto 0 auto" }}
                >
                    <Tab label="Params" key={0} />
                    <Tab label="Headers" key={1} />
                    <Tab label="Body" key={2} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <InputList title="Query Params" rows={paramData} setRow={setParamData} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <InputList title="Headers" rows={headerData} setRow={setHeaderData} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <InputJson />
            </TabPanel>
            <ResponseJson />
        </Box>
    );
}
