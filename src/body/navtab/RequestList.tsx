import { List } from "@mui/material";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import RequestTab from "../../interfaces/Request";
import RequestItem from "./RequestItem";
import { StrictModeDroppable as Droppable } from "../../common/StrictModeDroppable";

type RequestListProp = {
    requests: RequestTab[];
    deleteRequest: (id: number) => void;
    updateRequest: (request: RequestTab) => void;
    reroderRequests: (startIndex: number, endIndex: number) => void;
};

function RequestList(props: RequestListProp) {
    const { requests, deleteRequest, updateRequest, reroderRequests } = props;

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        reroderRequests(result.source.index, result.destination.index);
    };
    return (
        // TODO- check mui list to add dense/secondary line
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <List {...provided.droppableProps} ref={provided.innerRef}>
                        {requests.map((request, index) => (
                            <Draggable key={request.id} draggableId={request.id.toString()} index={index}>
                                {(provided) => (
                                    <RequestItem
                                        provided={provided}
                                        request={request}
                                        deleteRequest={deleteRequest}
                                        updateRequest={updateRequest}
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
