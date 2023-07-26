import { Alert, Badge, Box, IconButton, Tooltip, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import BackspaceIcon from "@mui/icons-material/Backspace";
import useActiveRequestStore from "../../../../ts/store/activeRequestStore";

function JSONInput() {
    const setRequestBody = useActiveRequestStore((store) => store.setRequestBody);
    const requestBody = useActiveRequestStore((store) => store.requestBody);

    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [jsonData, setJsonData] = useState(requestBody);

    const onChange = useCallback((value: any, _: any) => {
        setJsonData(value);
    }, []);

    const checkJson = () => {
        try {
            if (jsonData !== "") JSON.parse(jsonData);
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message.slice(error.message.indexOf(":") + 1));
            }
            setIsError(true);
        }
    };

    return (
        <>
            <Box sx={{ textAlign: "left" }}>
                <Typography>Request Body (JSON)</Typography>
                {isError && (
                    <Alert variant="outlined" severity="error">
                        Invalid JSON- {errorMessage}
                    </Alert>
                )}
                <Badge
                    sx={{ width: "100%" }}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    badgeContent={
                        <Tooltip title="Clear">
                            <IconButton
                                onClick={() => {
                                    setJsonData("");
                                    setIsError(false);
                                    setRequestBody("");
                                }}
                            >
                                <BackspaceIcon />
                            </IconButton>
                        </Tooltip>
                    }
                >
                    <CodeMirror
                        // value={response}
                        style={{ width: "100%" }}
                        minHeight="200px"
                        extensions={[json()]}
                        theme="dark" // TODO- check this shit
                        onBlur={() => {
                            checkJson();
                            setRequestBody(jsonData);
                        }}
                        onFocus={() => setIsError(false)}
                        value={jsonData}
                        onChange={onChange}
                        basicSetup={{
                            foldGutter: true,
                            dropCursor: false,
                            tabSize: 2,
                        }}
                    />
                </Badge>
            </Box>
            {/* <TextareaAutosize
                value={jsonData}
                onChange={(event) => setJsonData(event.target.value)}
                minRows={10}
                style={{ width: "100%", padding: "3% 4%", backgroundColor: "inherit", color: "inherit" }}
            /> */}
        </>
    );
}

export default JSONInput;
