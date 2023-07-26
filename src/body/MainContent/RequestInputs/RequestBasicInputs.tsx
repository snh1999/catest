import {
    Alert,
    Backdrop,
    Box,
    Button,
    CircularProgress,
    FormControl,
    MenuItem,
    Select,
    Snackbar,
    TextField,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { RequestType } from "../../../ts/types/requesttypes";
import useActiveRequestStore from "../../../ts/store/activeRequestStore";
import { Response } from "@tauri-apps/api/http";

function RequestBasicInputs() {
    // const { setResponse, setStartTime } = props;
    const reqType = ["GET", "POST", "PATCH", "PUT", "DELETE"] as RequestType[];

    const { requestBasicInfo, setRequestBasicInfo, sendRequest, setResponseObject } = useActiveRequestStore(
        (store) => ({
            requestBasicInfo: store.requestBasicInfo,
            setRequestBasicInfo: store.setRequestBasicInfo,
            sendRequest: store.sendRequest,
            setResponseObject: store.setResponseObject,
        })
    );

    const [requestType, setRequestType] = useState(requestBasicInfo.type);
    const [url, setUrl] = useState(requestBasicInfo.url);
    const [isLoading, setLoading] = useState(false);
    const [openSnackBar, setSnackBar] = useState("");

    function handleSendRequest() {
        setLoading(true);
        setRequestBasicInfo({ url, type: requestType });

        const startTime = Date.now();
        sendRequest()
            .then((response) => {
                if (response instanceof Response) {
                    setResponseObject(response, startTime);
                } else if (typeof response === "string") {
                    setSnackBar(response);
                    return;
                }
            })
            .catch((error) => {
                if (error instanceof Error) setSnackBar(error.message);
            })
            .finally(() => setLoading(false));
    }

    return (
        <>
            <Backdrop open={isLoading} sx={{ zIndex: "1" }}>
                <CircularProgress />
            </Backdrop>
            <Snackbar open={openSnackBar !== ""} autoHideDuration={6000} onClose={() => setSnackBar("")}>
                <Alert onClose={() => setSnackBar("")} severity="error" sx={{ width: "100%" }}>
                    {openSnackBar}
                </Alert>
            </Snackbar>

            <FormControl sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Select
                    value={requestType}
                    onChange={(event) => setRequestType(event.target.value as RequestType)}
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
                    onChange={(event) => setUrl(event.target.value)}
                    onBlur={() => setRequestBasicInfo({ url, type: requestType })}
                    sx={{ width: "85%", marginRight: "5px", fontSize: ".9rem" }}
                />
                <Button variant="contained" onClick={handleSendRequest} endIcon={<SendIcon />}>
                    <Box component="span" sx={{ paddingTop: "2px" }}>
                        Send
                    </Box>
                </Button>
            </FormControl>
        </>
    );
}

export default RequestBasicInputs;
