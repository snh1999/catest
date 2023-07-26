import { create } from "zustand";
import { DEFAULT_KEY_VALUE, KeyValue } from "../types/keyvalue";
import { RequestBasic } from "../types/requesttypes";
import { checkAll, checkURL, getKeyValue } from "../helper/requestDataValidator";
import { sendHttpRequest } from "../helper/request";
import { Response } from "@tauri-apps/api/http";
import { ResponseObject, DEFAULT_RESPONSE_OBJECT } from "../types/response";
import { RequestInputData } from "../types/requestInput";
import useRequestTabStore from "./requestTabStore";
import { persist } from "zustand/middleware";

interface ActiveRequestState {
    requestBasicInfo: RequestBasic;
    setRequestBasicInfo: (requestBasicInfo: RequestBasic) => void;
    paramData: KeyValue[];
    setParamData: (paramData: KeyValue[]) => void;
    headerData: KeyValue[];
    setHeaderData: (headerData: KeyValue[]) => void;
    requestBody: string;
    setRequestBody: (requestBody: string) => void;

    responseObject: ResponseObject;
    setResponseObject: (response: Response<any>, startTime: number) => void;
    cleanResponseObject: () => void;

    savedResponses: ResponseObject[];
    saveNewResponse: (response: ResponseObject) => void;

    updateState: () => void;

    getState: () => RequestInputData;

    sendRequest: () => Promise<string | Response<any> | Error>;
}

const useActiveRequestStore = create<ActiveRequestState>()(
    persist(
        (set, get) => ({
            requestBasicInfo: { url: "", type: "GET" },
            setRequestBasicInfo: (requestBasicInfo: RequestBasic) => set({ requestBasicInfo }),
            paramData: [DEFAULT_KEY_VALUE],
            setParamData: (paramData: KeyValue[]) => set({ paramData }),
            headerData: [DEFAULT_KEY_VALUE],
            setHeaderData: (headerData: KeyValue[]) => set({ headerData }),
            requestBody: "",
            setRequestBody: (requestBody: string) => set({ requestBody }),

            responseObject: DEFAULT_RESPONSE_OBJECT,
            setResponseObject: (response: Response<any>, startTime: number) =>
                set({
                    responseObject: {
                        body: response.data,
                        header: response.headers,
                        responseStats: response.status.toString(),
                        timetaken: (Date.now() - startTime).toString(),
                        size: response.headers["content-length"] ? response.headers["content-length"] : "...",
                        requestData: checkAll(get().headerData, get().paramData, get().requestBody),
                    },
                }),
            cleanResponseObject: () => set({ responseObject: DEFAULT_RESPONSE_OBJECT }),

            savedResponses: [],
            saveNewResponse: (response: ResponseObject) => {
                set((prevState) => ({
                    savedResponses: [...prevState.savedResponses, response],
                }));
            },

            updateState: () => {
                const activeTabInfo = useRequestTabStore.getState().getActiveTabInfo();
                if (activeTabInfo.length == 1)
                    set({
                        ...activeTabInfo[0],
                    });
            },

            getState: () => ({
                id: -1,
                requestBasicInfo: get().requestBasicInfo,
                paramData: get().paramData,
                headerData: get().headerData,
                requestBody: get().requestBody,
                savedResponses: get().savedResponses,
            }),

            sendRequest: async () => {
                const { url, type } = get().requestBasicInfo;

                let params: Record<string, string> = {};
                let header: Record<string, string> = {};
                let bodyObj: Record<any, any> = {};

                if (!checkURL(url)) return "Invalid URL";

                let temp = getKeyValue(get().headerData);
                if (typeof temp == "boolean") return "Invalid Header Value(s)";
                else header = temp;

                temp = getKeyValue(get().paramData);
                if (typeof temp == "boolean") return "Invalid Query Parameter";
                else params = temp;

                try {
                    if (get().requestBody !== "") bodyObj = JSON.parse(get().requestBody);
                } catch (error) {
                    return "Invalid Request JSON body";
                }

                return await sendHttpRequest(url, type, header, params, bodyObj);
            },
        }),
        {
            name: "activeRequest",
        }
    )
);

export default useActiveRequestStore;
