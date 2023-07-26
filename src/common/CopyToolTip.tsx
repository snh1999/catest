import { IconButton, Tooltip } from "@mui/material";
import CopyAllIcon from "@mui/icons-material/CopyAll";

function CopyToolTip({ text }: { text: any }) {
    return (
        <Tooltip title="Copy Response">
            <IconButton onClick={() => navigator.clipboard.writeText(text)}>
                <CopyAllIcon />
            </IconButton>
        </Tooltip>
    );
}

export default CopyToolTip;
