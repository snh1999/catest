import { List } from "@mui/material";
import RequestTab from "../../interfaces/Request";
import RequestItem from "./RequestItem";

type RequestListProp = {
    requests: RequestTab[];
    deleteRequest: (id: number) => void;
    updateRequest: (request: RequestTab) => void;
};

function RequestList(props: RequestListProp) {
    const { requests, deleteRequest, updateRequest } = props;
    return (
        // TODO- check mui list to add dense/secondary line
        <List>
            {requests.map((request) => (
                <RequestItem
                    request={request}
                    deleteRequest={deleteRequest}
                    updateRequest={updateRequest}
                    key={request.id}
                />
            ))}
        </List>
    );
}

export default RequestList;
