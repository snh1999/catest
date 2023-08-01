import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DocEditor from "./DocEditor";
import CopyToolTip from "../../common/CopyToolTip";
import CancelIcon from "@mui/icons-material/Cancel";
import { IconButton } from "@mui/material";

type DocViewerProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    documentation: string;
};

export default function DocViewer(props: DocViewerProps) {
    const { open, setOpen, documentation } = props;

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle id="alert-dialog-title" sx={{ display: "flex", justifyContent: "space-between" }}>
                    <span>
                        {"Documentation"}
                        <CopyToolTip text={documentation} />
                    </span>
                    <IconButton onClick={handleClose}>
                        <CancelIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <DocEditor documentation={documentation} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>{/* <Button onClick={handleClose}>Close</Button> */}</DialogActions>
            </Dialog>
        </div>
    );
}
