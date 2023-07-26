import { useState } from "react";
import { DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

///////////////////////////////////////
import { arrayMove as dndKitArrayMove } from "@dnd-kit/sortable";

export const removeAtIndex = (array, index) => {
    return [...array.slice(0, index), ...array.slice(index + 1)];
};

export const insertAtIndex = (array, index, item) => {
    return [...array.slice(0, index), item, ...array.slice(index)];
};

export const arrayMove = (array, oldIndex, newIndex) => {
    return dndKitArrayMove(array, oldIndex, newIndex);
};

////////////////////////////

import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";

const Droppable = ({ id, items }) => {
    const { setNodeRef } = useDroppable({ id });

    const droppableStyle = {
        padding: "20px 10px",
        border: "1px solid black",
        borderRadius: "5px",
        minWidth: 110,
    };

    return (
        <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
            <div ref={setNodeRef} style={droppableStyle}>
                {items.map((item) => (
                    <SortableItem key={item} id={item} />
                ))}
            </div>
        </SortableContext>
    );
};
//////////////////////////////////////////
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = (props) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });

    const itemStyle = {
        transform: CSS.Transform.toString(transform),
        transition,
        width: 110,
        height: 30,
        display: "flex",
        alignItems: "center",
        paddingLeft: 5,
        border: "1px solid gray",
        borderRadius: 5,
        marginBottom: 5,
        userSelect: "none",
        cursor: "grab",
        boxSizing: "border-box",
    };

    return (
        <div style={itemStyle} ref={setNodeRef} {...attributes} {...listeners}>
            Item {props.id}
        </div>
    );
};

//////////////////////////////// APP
function Temp() {
    const [items, setItems] = useState({
        group1: ["1", "2", "3"],
        group2: ["4", "5", "6"],
        group3: ["7", "8", "9"],
    });

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragOver = ({ over, active }) => {
        const overId = over?.id;

        if (!overId) {
            return;
        }

        const activeContainer = active.data.current.sortable.containerId;
        const overContainer = over.data.current?.sortable.containerId;

        if (!overContainer) {
            return;
        }

        if (activeContainer !== overContainer) {
            setItems((items) => {
                const activeIndex = active.data.current.sortable.index;
                const overIndex = over.data.current?.sortable.index || 0;

                return moveBetweenContainers(items, activeContainer, activeIndex, overContainer, overIndex, active.id);
            });
        }
    };

    const handleDragEnd = ({ active, over }) => {
        if (!over) {
            return;
        }

        if (active.id !== over.id) {
            const activeContainer = active.data.current.sortable.containerId;
            const overContainer = over.data.current?.sortable.containerId || over.id;
            const activeIndex = active.data.current.sortable.index;
            const overIndex = over.data.current?.sortable.index || 0;

            setItems((items) => {
                let newItems;
                if (activeContainer === overContainer) {
                    newItems = {
                        ...items,
                        [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex),
                    };
                } else {
                    newItems = moveBetweenContainers(
                        items,
                        activeContainer,
                        activeIndex,
                        overContainer,
                        overIndex,
                        active.id
                    );
                }

                return newItems;
            });
        }
    };

    const moveBetweenContainers = (items, activeContainer, activeIndex, overContainer, overIndex, item) => {
        return {
            ...items,
            [activeContainer]: removeAtIndex(items[activeContainer], activeIndex),
            [overContainer]: insertAtIndex(items[overContainer], overIndex, item),
        };
    };

    const containerStyle = { display: "flex" };

    return (
        <DndContext onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
            <div style={containerStyle}>
                {Object.keys(items).map((group) => (
                    <Droppable id={group} items={items[group]} key={group} />
                ))}
            </div>
        </DndContext>
    );
}

export default Temp;
