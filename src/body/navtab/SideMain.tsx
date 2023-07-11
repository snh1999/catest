import React, { useState } from "react";
import AddRequestField from "./AddRequest";
import RequestList from "../../body/navtab/RequestList";
import RequestTab from "../../common/interfaces/Request";
import { TabProps } from "../../common/interfaces/TabProps";

type SideMainProps = {
    tabProps: TabProps;
    setRequests: React.Dispatch<React.SetStateAction<RequestTab[]>>;
    activeTab: number;
};

function SideMain(props: SideMainProps) {
    const { tabProps, setRequests, activeTab } = props;
    const requests = tabProps.requestArr;
    const handleTabChange = tabProps.handleChange;
    // const [requests, setRequests] = useState<RequestTab[]>([]);

    const addRequest = (title: string) => {
        const newRequest: RequestTab = { title, id: requests.length };
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
            console.log(prevState);
            const [dragItem] = prevState.splice(startIndex, 1);
            console.log(prevState);

            prevState.splice(endIndex, 0, dragItem);
            console.log(prevState);

            return prevState;
        });
    };

    return (
        <React.Fragment>
            <AddRequestField addRequest={addRequest} />
            {requests && (
                <RequestList
                    requests={requests}
                    activeTab={activeTab}
                    deleteRequest={deleteRequest}
                    updateRequest={updateRequest}
                    reroderRequests={reroderRequests}
                    handleTabChange={handleTabChange}
                />
            )}
        </React.Fragment>
    );
}

export default SideMain;
