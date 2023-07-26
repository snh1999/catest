import { List } from "@mui/material";
import useRequestTabStore from "../../../ts/store/requestTabStore";
import TabItem from "./TabItem";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { Droppable, DroppableProps } from "react-beautiful-dnd";
import useActiveRequestStore from "../../../ts/store/activeRequestStore";

const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        const animation = requestAnimationFrame(() => setEnabled(true));

        return () => {
            cancelAnimationFrame(animation);
            setEnabled(false);
        };
    }, []);

    if (!enabled) {
        return null;
    }

    return <Droppable {...props}>{children}</Droppable>;
};

function TabsList() {
    const { requestTabs, reorderRequest, activeTab, setActiveTab } = useRequestTabStore((state) => ({
        requestTabs: state.requestTabs,
        reorderRequest: state.reorderRequest,
        activeTab: state.activeTab,
        setActiveTab: state.setActiveTab,
    }));

    const updateState = useActiveRequestStore((store) => store.updateState);

    const [parent] = useAutoAnimate();

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const source = result.source.index;
        const dest = result.destination.index;
        reorderRequest(source, dest);

        if (activeTab === source) setActiveTab(dest);
        else if (source < activeTab && activeTab <= dest) setActiveTab(activeTab - 1);
        else if (dest <= activeTab && activeTab < source) setActiveTab(activeTab + 1);
        updateState();
    };

    return (
        // TODO- check mui list to add dense/secondary line
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
            <StrictModeDroppable droppableId="droppable">
                {(provided) => (
                    <List {...provided.droppableProps} ref={provided.innerRef}>
                        {requestTabs.map((requestTab, index) => (
                            <Draggable key={requestTab.id} draggableId={requestTab.id.toString()} index={index}>
                                {(provided) => <TabItem provided={provided} requestTab={requestTab} tabIndex={index} />}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </List>
                )}
            </StrictModeDroppable>
        </DragDropContext>
    );
}

export default TabsList;
