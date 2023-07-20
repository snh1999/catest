import { Backdrop, Box, Button, CircularProgress, FormControl, MenuItem, Select, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import BodyTabs from "./BodyTab";
import { useContext, useEffect, useState } from "react";
import { RequestType } from "../../common/interfaces/NewRequest";
import { RequestContextType, RequestDataContext } from "../../common/context/RequestContext";
import { getKeyValue } from "../../helperTs/RequestDataValidator";
import { sendHttpRequest } from "../../helperTs/Request";
import { ResponseContextType, ResponseDataContext } from "../../common/context/ResponseContext";

type FormProps = {
    activeTab: number;
};

function RequestForm() {
    console.log("relaoded");
    const reqType = ["GET", "POST", "PATCH", "PUT", "DELETE"] as RequestType[];

    const { paramData, headerData, jsonData } = useContext(RequestDataContext) as RequestContextType;

    const [requestType, setRequestType] = useState("GET" as RequestType);
    const [url, setUrl] = useState("");

    const { setResponseHeader, setResponseBody, setResponseStats } = useContext(
        ResponseDataContext
    ) as ResponseContextType;

    const [isLoading, setLoading] = useState(false);

    function sendRequest() {
        setLoading(true);
        console.log(isLoading);
        let params: Record<string, string> = {};
        let header: Record<string, string> = {};
        let bodyObj: Record<any, any> = {};
        let isError = false;

        // isError = checkURL(url);

        if (!isError) {
            const temp = getKeyValue(headerData);
            isError = !temp[0] as boolean;
            header = temp[1] as Record<string, string>;
        }

        if (!isError) {
            const temp = getKeyValue(paramData);
            isError = !temp[0] as boolean;
            params = temp[1] as Record<string, string>;
        }

        if (!isError) {
            try {
                bodyObj = JSON.parse(jsonData);
            } catch (error) {
                isError = true;
            }
        }

        if (!isError) {
            let status: string = "",
                size: string = "";
            const startTime = Date.now();
            sendHttpRequest(url, requestType, header, params, bodyObj)
                .then((response) => {
                    setResponseBody(response.data);
                    setResponseHeader(response.headers);
                    status = response.status.toString();
                    size = response.headers["content-length"];
                    if (size == undefined) size = "...";
                    setResponseStats([status, (Date.now() - startTime).toString(), size]);
                })
                .catch((error) => {
                    console.log(error);
                    // status = error.status.toString();
                    // size = "0";
                })
                .finally(() => setLoading(false));
        }
        console.log(isLoading);
    }

    useEffect(() => {}, []);

    return (
        <>
            <Backdrop open={isLoading} sx={{ zIndex: "1" }}>
                <CircularProgress />
            </Backdrop>
            {/* {isLoading && (
                <Backdrop open={isloadin}>
                    <CircularProgress />
                </Backdrop>
                // <Box sx={{ paddingTop: "50%" }}>
                // </Box>
            )} */}
            <>
                <FormControl sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <Select
                        value={requestType}
                        onChange={(event) => {
                            setRequestType(event.target.value as RequestType);
                        }}
                        size="small"
                        sx={{ marginRight: "5px", fontSize: ".9rem" }}
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
                        variant="outlined"
                        required
                        size="small"
                        defaultValue={url}
                        type="url"
                        placeholder="https://example.com"
                        onBlur={(event) => {
                            setUrl(event.target.value);
                        }}
                        sx={{ width: "85%", marginRight: "5px", fontSize: ".9rem" }}
                    />
                    <Button variant="contained" onClick={sendRequest} endIcon={<SendIcon />}>
                        <Box component="span" sx={{ paddingTop: "2px" }}>
                            Send
                        </Box>
                    </Button>
                </FormControl>

                <BodyTabs />
            </>
        </>
    );
}

export default RequestForm;
