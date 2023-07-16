import { useState } from "react";
import { IconButton, ListItem, ListItemIcon, ListItemText, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import { DraggableProvided } from "react-beautiful-dnd";

import RequestTab from "../../common/interfaces/RequestTab";

const CONFIRM_TEXT = "Are you sure?";

type RequestItemProp = {
    tabIndex: number;
    provided: DraggableProvided;

    request: RequestTab;
    deleteRequest: (id: number) => void;
    updateRequest: (request: RequestTab) => void;

    activeTab: number;
    setActiveTab: (index: number) => void;
};

// todo - change the delete function -> setto false

function RequestItem(props: RequestItemProp) {
    const { request, deleteRequest, updateRequest, setActiveTab, activeTab, tabIndex, provided } = props;

    const [isConfirmState, setConfirmState] = useState(false);
    const [isEditing, setEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(request.title);

    function toggleConfirm() {
        setConfirmState(!isConfirmState);
    }
    function toggleIsEditing() {
        setEditing(!isEditing);
    }
    function completeEdit() {
        updateRequest({ ...request, title: editedTitle });
        toggleIsEditing();
        // updateRequest
    }

    if (isConfirmState) {
        return (
            <ListItem {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                <IconComponent setState={toggleConfirm} isCancel={true} isDelete={false} />
                <ListItemText primary={CONFIRM_TEXT} secondary={null} />
                <IconComponent setState={() => deleteRequest(request.id)} isCancel={false} isDelete={false} />
            </ListItem>
        );
    } else if (isEditing) {
        return (
            <ListItem {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                <IconComponent setState={toggleIsEditing} isCancel={true} isDelete={false} />
                <ListItemText style={{ paddingRight: "5px" }}>
                    <TextField
                        type="text"
                        id="tab"
                        value={editedTitle}
                        onChange={(event) => setEditedTitle(event.target.value)}
                        size="small"
                        variant="standard"
                        required
                        fullWidth
                        sx={{ width: "80%" }}
                    />
                </ListItemText>
                <IconComponent setState={completeEdit} isCancel={false} isDelete={false} />
            </ListItem>
        );
    } else {
        return (
            <ListItem
                onDoubleClick={toggleIsEditing}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                selected={tabIndex == activeTab}
                onClick={() => setActiveTab(tabIndex)}
                secondaryAction={
                    <IconButton edge="end" onClick={toggleConfirm}>
                        <DeleteIcon color="warning" />
                    </IconButton>
                }
            >
                <ListItemIcon sx={{ minWidth: "0px", paddingRight: "10px" }}>
                    <FolderIcon />
                </ListItemIcon>
                <ListItemText primary={request.title} secondary={null} />
                {/* <IconComponent setState={toggleConfirm} isCancel={false} isDelete={true} /> */}
            </ListItem>
        );
    }
}

type IconComponentProp = {
    setState: () => void;
    isCancel: boolean;
    isDelete: boolean;
};

function IconComponent(prop: IconComponentProp) {
    const { setState, isCancel, isDelete } = prop;
    return (
        <ListItemIcon onClick={setState} sx={{ minWidth: "0px", paddingRight: "7px" }}>
            {isDelete ? (
                <DeleteIcon />
            ) : isCancel ? (
                <CancelIcon color="warning" />
            ) : (
                <CheckCircleIcon color="success" />
            )}
        </ListItemIcon>
    );
}

export default RequestItem;
