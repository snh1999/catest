import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, TextareaAutosize, Typography } from "@mui/material";
import { useCallback, useContext, useState } from "react";
import { RequestContextType, RequestDataContext } from "../common/context/RequestContext";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function InputJson() {
    const { jsonData, setJsonData } = useContext(RequestDataContext) as RequestContextType;
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

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
                <CodeMirror
                    // value={response}
                    minHeight="200px"
                    extensions={[json()]}
                    theme="dark" // TODO- check this shit
                    onBlur={() => checkJson()}
                    onFocus={() => setIsError(false)}
                    value={jsonData}
                    onChange={onChange}
                    basicSetup={{
                        foldGutter: true,
                        dropCursor: false,
                        tabSize: 2,
                    }}
                />
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

export default InputJson;
