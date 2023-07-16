import { IconButton, TextField, useTheme } from "@mui/material";
import toast, { Toaster, ToastPosition } from "react-hot-toast";
import "../../styles.css";
import AddLinkIcon from "@mui/icons-material/AddLink";
import { useState } from "react";

const DEFAULT_REQUEST_TEXT = "New Request";
const TOAST_CONFIG = {
    duration: 1500,
    position: "bottom-left" as ToastPosition,
};

type NavProps = {
    addRequest: (title: string) => void;
};

function AddRequestField(props: NavProps) {
    const [request, setRequest] = useState("");

    const handleFormSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        const requestText = request ? request : DEFAULT_REQUEST_TEXT;
        setRequest("");
        props.addRequest(requestText);
        // TODO- make a separate component?
        toast.success(`${requestText} created!`, TOAST_CONFIG);
    };
    return (
        <form className="request-tab" onSubmit={handleFormSubmit} style={{ display: "flex", alignItems: "center" }}>
            <TextField
                type="text"
                id="tab"
                label="New Request"
                value={request}
                onChange={(event) => setRequest(event.target.value)}
                size="small"
                sx={{ paddingLeft: "5px" }}
            />
            <IconButton
                style={{
                    marginLeft: "5px",
                    backgroundColor: useTheme().palette.success.main,
                }}
                type="submit"
            >
                <AddLinkIcon />
            </IconButton>
            <Toaster />
        </form>
    );
}

export default AddRequestField;

// InputProps={{
//     endAdornment: (
//         <InputAdornment position="end">
//             <IconButton
//                 // style={
//                 //     {
//                 //         // marginLeft: "5px",
//                 //         // backgroundColor: useTheme().palette.success.main,
//                 //     }
//                 // }
//                 type="submit"
//             >
//                 <AddLinkIcon />
//             </IconButton>
//         </InputAdornment>
//     ),
// }}
