import { Badge, Box } from "@mui/material";
import CopyToolTip from "../../../common/CopyToolTip";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";

export default function ResponseBody({ response }: { response: string }) {
    return (
        <Box sx={{ textAlign: "left" }}>
            <Badge
                sx={{ width: "100%" }}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                badgeContent={<CopyToolTip text={response} />}
            >
                <CodeMirror
                    value={response}
                    maxHeight="400px"
                    style={{ width: "100%" }}
                    extensions={[json()]}
                    theme="dark"
                    readOnly
                    autoFocus={false}
                    basicSetup={{
                        foldGutter: true,
                        dropCursor: false,
                        tabSize: 2,
                    }}
                />
            </Badge>
        </Box>
    );
}
