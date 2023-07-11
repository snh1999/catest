import { List } from "@mui/material";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import RequestTab from "../../common/interfaces/Request";
import RequestItem from "./RequestItem";
import { StrictModeDroppable as Droppable } from "../../common/StrictModeDroppable";

type RequestListProp = {
    requests: RequestTab[];
    activeTab: number;
    deleteRequest: (id: number) => void;
    updateRequest: (request: RequestTab) => void;
    reroderRequests: (startIndex: number, endIndex: number) => void;
    handleTabChange: (index: number) => void;
};

function RequestList(props: RequestListProp) {
    const { requests, deleteRequest, updateRequest, reroderRequests, handleTabChange, activeTab } = props;

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const source = result.source.index;
        const dest = result.destination.index;
        reroderRequests(source, dest);

        if (activeTab === source) handleTabChange(dest);
        else if (source < activeTab && activeTab <= dest) handleTabChange(activeTab - 1);
        else if (dest <= activeTab && activeTab < source) handleTabChange(activeTab + 1);
    };

    return (
        // TODO- check mui list to add dense/secondary line
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <List {...provided.droppableProps} ref={provided.innerRef}>
                        {requests.map((request, index) => (
                            <Draggable key={request.id} draggableId={request.id.toString()} index={index}>
                                {(provided) => (
                                    <RequestItem
                                        provided={provided}
                                        request={request}
                                        activeTab={activeTab}
                                        deleteRequest={deleteRequest}
                                        updateRequest={updateRequest}
                                        handleTabChange={handleTabChange}
                                        tabIndex={index}
                                        // key={request.id}
                                    />
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </List>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default RequestList;
