import { createContext, useState } from "react";
import { DEFAULT_KEY_VALUE, KeyValue } from "../interfaces/KeyValue";

export type RequestContextType = {
    paramData: KeyValue[];
    setParamData: React.Dispatch<React.SetStateAction<KeyValue[]>>;
    headerData: KeyValue[];
    setHeaderData: React.Dispatch<React.SetStateAction<KeyValue[]>>;
    jsonData: string;
    setJsonData: React.Dispatch<React.SetStateAction<string>>;
};

export const RequestDataContext = createContext<RequestContextType | null>(null);

type ProviderProp = {
    children: JSX.Element;
};

function RequestDataProvider(props: ProviderProp) {
    const [paramData, setParamData] = useState([DEFAULT_KEY_VALUE]);
    const [headerData, setHeaderData] = useState([DEFAULT_KEY_VALUE]);
    const [jsonData, setJsonData] = useState("");

    return (
        <RequestDataContext.Provider
            value={{
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
