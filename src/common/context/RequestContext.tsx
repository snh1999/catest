import { createContext, useState } from "react";
import { NewRequest, RequestType } from "../interfaces/NewRequest";
import { DEFAULT_KEY_VALUE, KeyValue } from "../interfaces/KeyValue";

export type RequestContextType = {
    requestType: RequestType;
    setRequestType: React.Dispatch<React.SetStateAction<RequestType>>;
    url: string;
    setUrl: React.Dispatch<React.SetStateAction<string>>;
    paramData: KeyValue[];
    setParamData: React.Dispatch<React.SetStateAction<KeyValue[]>>;
    headerData: KeyValue[];
    setHeaderData: React.Dispatch<React.SetStateAction<KeyValue[]>>;
    jsonData: string;
    setJsonData: React.Dispatch<React.SetStateAction<string>>;
};

// type StringSetPair = {
//     data: string;
//     setData: React.Dispatch<React.SetStateAction<string>>
// }

export const RequestDataContext = createContext<RequestContextType | null>(null);

type ProviderProp = {
    children: JSX.Element;
};

function RequestDataProvider(props: ProviderProp) {
    const [requestType, setRequestType] = useState("GET" as RequestType);
    const [url, setUrl] = useState("");

    const [paramData, setParamData] = useState([DEFAULT_KEY_VALUE]);
    const [headerData, setHeaderData] = useState([DEFAULT_KEY_VALUE]);
    const [jsonData, setJsonData] = useState("");

    return (
        <RequestDataContext.Provider
            value={{
                requestType,
                setRequestType,
                url,
                setUrl,
                paramData,
                setParamData,
                headerData,
                setHeaderData,
                jsonData,
                setJsonData,
            }}
        >
            {props.children}
        </RequestDataContext.Provider>
    );
}

export default RequestDataProvider;
