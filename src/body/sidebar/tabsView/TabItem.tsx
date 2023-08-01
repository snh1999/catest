import useRequestTabStore from "../../../ts/store/requestTabStore";
import { useState } from "react";
import { IconButton, ListItem, ListItemIcon, ListItemText, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { RequestTab } from "../../../ts/types/requestTab";
import { DraggableProvided } from "react-beautiful-dnd";
import useActiveRequestStore from "../../../ts/store/activeRequestStore";

const CONFIRM_TEXT = "Are you sure?";

type TabProps = {
    tabIndex: number;
    requestTab: RequestTab;
    provided: DraggableProvided;
};

function TabItem(props: TabProps) {
    const { tabIndex, requestTab, provided } = props;

    const updateRequest = useRequestTabStore((store) => store.updateRequestTitle);
    const deleteRequest = useRequestTabStore((store) => store.deleteRequest);
    const activeTab = useRequestTabStore((store) => store.activeTab);
    const setActiveTab = useRequestTabStore((store) => store.setActiveTab);

    const updateState = useActiveRequestStore((store) => store.updateState);

    const [isConfirmState, setConfirmState] = useState(false);
    const [isEditing, setEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(requestTab.title);

    function toggleConfirm() {
        setConfirmState(!isConfirmState);
    }
    function toggleIsEditing() {
        setEditing(!isEditing);
    }
    function completeEdit() {
        updateRequest({ ...requestTab, title: editedTitle });
        toggleIsEditing();
    }

    if (isConfirmState) {
        return (
            <ListItem {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                <IconComponent setState={toggleConfirm} isCancel={true} isDelete={false} />
                <ListItemText primary={CONFIRM_TEXT} secondary={null} />
                <IconComponent
                    setState={() => {
                        if (activeTab === tabIndex) {
                            setActiveTab(0);
                            updateState();
                            toggleConfirm();
                        }
                        deleteRequest(requestTab.id);
                    }}
                    isCancel={false}
                    isDelete={false}
                />
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
                onClick={() => {
                    setActiveTab(tabIndex);
                    updateState();
                }}
                secondaryAction={
                    <IconButton sx={{ cursor: "context-menu" }} edge="end" onClick={toggleConfirm}>
                        <DeleteIcon color="error" />
                    </IconButton>
                }
            >
                <ListItemIcon sx={{ minWidth: "0px", paddingRight: "10px" }}>
                    <DragIndicatorIcon />
                </ListItemIcon>
                <ListItemText sx={{ cursor: "pointer" }} primary={requestTab.title} secondary={null} />
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
        <ListItemIcon onClick={setState} sx={{ minWidth: "0px", paddingRight: "7px", cursor: "context-menu" }}>
            {isDelete ? <DeleteIcon /> : isCancel ? <CancelIcon color="error" /> : <CheckCircleIcon color="success" />}
        </ListItemIcon>
    );
}

export default TabItem;
