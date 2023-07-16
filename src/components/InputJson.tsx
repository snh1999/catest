import { TextareaAutosize, Typography } from "@mui/material";
import { useContext } from "react";
import { RequestContextType, RequestDataContext } from "../common/context/RequestContext";

function InputJson() {
    const { jsonData, setJsonData } = useContext(RequestDataContext) as RequestContextType;
    return (
        <>
            <Typography>Request Body</Typography>
            <TextareaAutosize
                value={jsonData}
                onChange={(event) => setJsonData(event.target.value)}
                minRows={10}
                style={{ width: "100%", padding: "3% 4%", backgroundColor: "inherit", color: "inherit" }}
            />
        </>
    );
}

export default InputJson;
