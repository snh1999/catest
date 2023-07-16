import { List } from "@mui/material";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import RequestTab from "../../common/interfaces/RequestTab";
import RequestItem from "./RequestItem";
import { StrictModeDroppable as Droppable } from "../../common/StrictModeDroppable";

type RequestListProp = {
    requestTabs: RequestTab[];
    activeTab: number;

    deleteRequest: (id: number) => void;
    updateRequest: (request: RequestTab) => void;
    setActiveTab: (index: number) => void;

    reroderRequests: (startIndex: number, endIndex: number) => void;
};

function RequestList(props: RequestListProp) {
    const { requestTabs, deleteRequest, updateRequest, reroderRequests, setActiveTab, activeTab } = props;

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const source = result.source.index;
        const dest = result.destination.index;
        reroderRequests(source, dest);

        if (activeTab === source) setActiveTab(dest);
        else if (source < activeTab && activeTab <= dest) setActiveTab(activeTab - 1);
        else if (dest <= activeTab && activeTab < source) setActiveTab(activeTab + 1);
    };

    return (
        // TODO- check mui list to add dense/secondary line
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <List {...provided.droppableProps} ref={provided.innerRef}>
                        {requestTabs.map((request, index) => (
                            <Draggable key={request.id} draggableId={request.id.toString()} index={index}>
                                {(provided) => (
                                    <RequestItem
                                        {...{
                                            provided,
                                            request,
                                            activeTab,
                                            deleteRequest,
                                            updateRequest,
                                            setActiveTab,
                                        }}
                                        tabIndex={index}
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
