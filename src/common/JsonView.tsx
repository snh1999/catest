import { Badge, Box } from "@mui/material";
import CopyToolTip from "./CopyToolTip";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";

export default function JsonView({ jsonString }: { jsonString: string }) {
    return (
        <Box sx={{ textAlign: "left" }}>
            <Badge
                sx={{ width: "100%" }}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                badgeContent={<CopyToolTip text={jsonString} />}
            >
                <CodeMirror
                    value={jsonString}
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
