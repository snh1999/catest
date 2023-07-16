import React from "react";
import AddRequestField from "./AddRequest";
import RequestList from "./RequestList";
import RequestTab from "../../common/interfaces/RequestTab";

type TabsHandlerProps = {
    activeTab: number;
    setActiveTab: (newValue: number) => void;

    requestTabs: RequestTab[];
    setRequestTabs: React.Dispatch<React.SetStateAction<RequestTab[]>>;
};

function TabsHandler(props: TabsHandlerProps) {
    const { requestTabs, setRequestTabs, activeTab, setActiveTab } = props;

    const addRequest = (title: string) => {
        const newRequest: RequestTab = { title, id: requestTabs.length };
        setRequestTabs((prevState) => [...prevState, newRequest]);
    };

    const deleteRequest = (id: number) => {
        setRequestTabs((prevState) => prevState.filter((req) => req.id !== id));
    };

    const updateRequest = (newRequest: RequestTab) => {
        setRequestTabs((prevState) =>
            prevState.map((req) => (req.id === newRequest.id ? { ...req, title: newRequest.title } : req))
        );
    };

    const reroderRequests = (startIndex: number, endIndex: number) => {
        setRequestTabs((prevState) => {
            const [dragItem] = prevState.splice(startIndex, 1);
            prevState.splice(endIndex, 0, dragItem);
            return prevState;
        });
    };

    return (
        <React.Fragment>
            <AddRequestField addRequest={addRequest} />
            {requestTabs && (
                <RequestList
                    {...{
                        requestTabs,
                        deleteRequest,
                        updateRequest,
                        reroderRequests,

                        activeTab,
                        setActiveTab,
                    }}
                />
            )}
        </React.Fragment>
    );
}

export default TabsHandler;
