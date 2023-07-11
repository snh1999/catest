import React, { useState } from "react";
import AddRequestField from "./AddRequest";
import RequestList from "./RequestList";
import RequestTab from "../../common/interfaces/Request";
import { TabProps } from "../../common/interfaces/TabProps";

type TabsHandlerProps = {
    activeTab: number;
    requestArr: RequestTab[];
    handleChange: (newValue: number) => void;
    setRequests: React.Dispatch<React.SetStateAction<RequestTab[]>>;
};

function TabsHandler(props: TabsHandlerProps) {
    const { requestArr, setRequests, activeTab } = props;
    const handleTabChange = props.handleChange;

    const addRequest = (title: string) => {
        const newRequest: RequestTab = { title, id: requestArr.length };
        setRequests((prevState) => [...prevState, newRequest]);
    };

    const deleteRequest = (id: number) => {
        setRequests((prevState) => prevState.filter((req) => req.id !== id));
    };

    const updateRequest = (newRequest: RequestTab) => {
        setRequests((prevState) =>
            prevState.map((req) => (req.id === newRequest.id ? { ...req, title: newRequest.title } : req))
        );
    };

    const reroderRequests = (startIndex: number, endIndex: number) => {
        setRequests((prevState) => {
            const [dragItem] = prevState.splice(startIndex, 1);
            prevState.splice(endIndex, 0, dragItem);
            return prevState;
        });
    };

    return (
        <React.Fragment>
            <AddRequestField addRequest={addRequest} />
            {requestArr && (
                <RequestList
                    {...{
                        requests: requestArr,
                        activeTab,
                        deleteRequest,
                        updateRequest,
                        reroderRequests,
                        handleTabChange,
                    }}
                />
            )}
        </React.Fragment>
    );
}

export default TabsHandler;
