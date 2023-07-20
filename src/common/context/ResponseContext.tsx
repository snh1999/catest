import { createContext, useState } from "react";

export type ResponseContextType = {
    responseHeader: Record<string, string>;
    setResponseHeader: React.Dispatch<React.SetStateAction<Record<string, string>>>;
    responseBody: any;
    setResponseBody: React.Dispatch<React.SetStateAction<any>>;
    responseStats: [string, string, string];
    setResponseStats: React.Dispatch<React.SetStateAction<[string, string, string]>>;
    cleanResponse: () => void;
};

export const ResponseDataContext = createContext<ResponseContextType | null>(null);

type ProviderProp = {
    children: JSX.Element;
};

function ResponseDataProvider(props: ProviderProp) {
    const [responseHeader, setResponseHeader] = useState<Record<string, string>>({});
    const [responseBody, setResponseBody] = useState<any>();
    const [responseStats, setResponseStats] = useState<[string, string, string]>(["", "", ""]);

    function cleanResponse() {
        setResponseHeader({});
        setResponseBody("");
        setResponseStats(["", "", ""]);
    }

    return (
        <ResponseDataContext.Provider
            value={{
                responseHeader,
                setResponseHeader,
                responseBody,
                setResponseBody,
                responseStats,
                setResponseStats,
                cleanResponse,
            }}
        >
            {props.children}
        </ResponseDataContext.Provider>
    );
}

export default ResponseDataProvider;
