import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import DeleteIcon from "@mui/icons-material/Delete";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Box, Chip } from "@mui/material";
import JsonView from "../../../../common/JsonView";
import useActiveRequestStore from "../../../../ts/store/activeRequestStore";
import { forwardRef, useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { DEFAULT_RESPONSE_OBJECT, ResponseObject } from "../../../../ts/types/response";
import ResponseInfoSummary from "../../ResponseData/ResponseInfoSummary";

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    reqBodies: Record<any, any>[];
};

export default function FormRequest(props: Props) {
    const { open, setOpen, reqBodies } = props;

    const [reqBodyState, setReqBody] = useState(reqBodies);

    const handleClose = () => {
        setOpen(false);
    };

    function deleteRequest(index: number) {
        setReqBody((prevState) => prevState.filter((_, idx) => idx !== index));
    }

    useEffect(() => {
        setReqBody(reqBodies);
    }, [reqBodies]);

    return (
        <div>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar sx={{ position: "relative" }}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Request Body
                        </Typography>
                        <Button endIcon={<SendIcon />}>Send All</Button>
                    </Toolbar>
                </AppBar>
                {reqBodyState.map((reqBody, idx) => (
                    <ResponsesView reqBody={reqBody} deleteRequest={deleteRequest} index={idx} />
                ))}
            </Dialog>
        </div>
    );
}

type HelperProps = { reqBody: Record<any, any>; deleteRequest: (index: number) => void; index: number };

function ResponsesView({ reqBody, deleteRequest, index }: HelperProps) {
    const sendRequestWithBody = useActiveRequestStore((store) => store.sendRequestWithBody);
    const saveNewResponseWithBody = useActiveRequestStore((store) => store.saveNewResponseWithBody);
    const [responseObject, setResponseObject] = useState<ResponseObject>(DEFAULT_RESPONSE_OBJECT);

    function handleSendReq() {
        const startTime = Date.now();
        sendRequestWithBody(reqBody, startTime).then((response) => {
            if (response instanceof Object && !(response instanceof Error)) setResponseObject(response);
        });
    }

    return (
        <Box sx={{ display: "flex", padding: "15px 0px" }}>
            <Box sx={{ width: "50%", padding: "10px 10px 5px", margin: "auto 0px" }}>
                <Chip sx={{ marginBottom: "5px" }} label="Request Body" color="success" variant="outlined" />
                {responseObject.responseStats !== "" && (
                    <IconButton onClick={() => saveNewResponseWithBody(responseObject, reqBody)}>
                        <SaveAsIcon />
                    </IconButton>
                )}
                <JsonView jsonString={JSON.stringify(reqBody, null, 2)} />

                <IconButton color="error" onClick={() => deleteRequest(index)}>
                    <DeleteIcon />
                </IconButton>

                <Button
                    color="inherit"
                    sx={{ position: "absolute", right: "50%" }}
                    onClick={() => handleSendReq()}
                    endIcon={<SendIcon />}
                >
                    Send
                </Button>
            </Box>
            {responseObject.responseStats !== "" && (
                <Box sx={{ width: "50%", padding: "10px" }}>
                    <Box sx={{ display: "flex" }}>
                        <ResponseInfoSummary {...responseObject} />
                        {/* // TODO - fix this later */}
                        <IconButton onClick={() => setResponseObject(DEFAULT_RESPONSE_OBJECT)}>
                            <ClearIcon />
                        </IconButton>
                    </Box>
                    <JsonView jsonString={JSON.stringify(responseObject.body, null, 2)} />
                    {/* <ResponseViewer responseObject={responseObject} /> */}
                </Box>
            )}
        </Box>
    );
}
