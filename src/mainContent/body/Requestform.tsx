import { Box, Button, FormControl, MenuItem, Select, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import BodyTabs from "./BodyTab";
import { useContext, useState } from "react";
import { RequestType } from "../../common/interfaces/NewRequest";
import { DEFAULT_KEY_VALUE } from "../../common/interfaces/KeyValue";
import { RequestContextType, RequestDataContext } from "../../common/context/RequestContext";

type FormProps = {
    activeTab: number;
};

function RequestForm() {
    const reqType = ["GET", "POST", "PATCH", "DELETE"] as RequestType[];

    const { requestType, setRequestType, url, setUrl } = useContext(RequestDataContext) as RequestContextType;

    // const [requestType, setRequestType] = useState("GET" as RequestType);
    // const [url, setUrl] = useState("");

    // const [paramData, setParamData] = useState<Record<string, string>>();
    // const [paramData, setParamData] = useState([DEFAULT_KEY_VALUE]);
    // const [headerData, setHeaderData] = useState([DEFAULT_KEY_VALUE]);
    // const [jsonData, setJsonData] = useState("");

    return (
        <Box>
            <FormControl sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Select
                    value={requestType}
                    onChange={(event) => {
                        setRequestType(event.target.value as RequestType);
                    }}
                    size="small"
                    sx={{ minWidth: "100px", marginRight: "5px", fontSize: ".9rem" }}
                    autoWidth
                    required
                >
                    {reqType.map((item, index) => (
                        <MenuItem key={index} value={item}>
                            {item}
                        </MenuItem>
                    ))}
                </Select>
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    value={url}
                    onChange={(event) => {
                        setUrl(event.target.value);
                    }}
                    sx={{ width: "85%", marginRight: "5px", fontSize: ".9rem" }}
                />
                <Button variant="contained" endIcon={<SendIcon />}>
                    Send
                </Button>
            </FormControl>

            <BodyTabs />
        </Box>
    );
}

export default RequestForm;
