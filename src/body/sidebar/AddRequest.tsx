import { Alert, IconButton, Snackbar, TextField, useTheme } from "@mui/material";
import "../../styles.css";
import AddLinkIcon from "@mui/icons-material/AddLink";
import { useState } from "react";
import useRequestTabStore from "../../ts/store/requestTabStore";

const DEFAULT_REQUEST_TEXT = "New Request";

function AddRequest() {
    const [requestTitle, setRequestTitle] = useState("");
    const [snackBarText, setSnackBarText] = useState("");
    const [open, setOpen] = useState(false);

    const toggleSnackBar = () => setOpen(!open);
    const addRequest = useRequestTabStore((state) => state.addRequest);

    const handleFormSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        const requestText = requestTitle ? requestTitle : DEFAULT_REQUEST_TEXT;
        addRequest(requestText);
        setSnackBarText(requestText + " Created!");
        toggleSnackBar();
        setRequestTitle("");
    };
    return (
        <>
            <form
                className="request-tab"
                onSubmit={handleFormSubmit}
                style={{ display: "flex", alignItems: "center", margin: "0 auto" }}
            >
                <TextField
                    type="text"
                    id="tab"
                    placeholder="New Request"
                    value={requestTitle}
                    onChange={(event) => setRequestTitle(event.target.value)}
                    size="small"
                    sx={{ width: "250px", maxWidth: "95%" }}
                />
                <IconButton
                    style={{
                        marginLeft: "5px",
                        backgroundColor: useTheme().palette.success.main,
                        color: "white",
                    }}
                    type="submit"
                >
                    <AddLinkIcon />
                </IconButton>
            </form>

            <Snackbar open={open} autoHideDuration={1500} onClose={toggleSnackBar}>
                <Alert onClose={toggleSnackBar} variant="outlined" severity="success" sx={{ width: "100%" }}>
                    {snackBarText}
                </Alert>
            </Snackbar>
        </>
    );
}

export default AddRequest;
