import { create } from "zustand";
import { RequestTab } from "../types/requestTab";
import { DEFAULT_REQUEST_INPUT, RequestInputData } from "../types/requestInput";
import { devtools, persist } from "zustand/middleware";

interface RequestTabState {
    requestTabs: RequestTab[];
    inputData: RequestInputData[];
    activeTab: number;
    setActiveTab: (newActiveTab: number) => void;
    addRequest: (title: string) => void;
    updateRequestTitle: (newRequest: RequestTab) => void;
    deleteRequest: (id: number) => void;
    reorderRequest: (startIndex: number, endIndex: number) => void;
    updateInputData: (newInputData: RequestInputData) => void;
    getActiveTabInfo: () => RequestInputData;
    getStateVariables: () => { title: RequestTab[]; info: RequestInputData[] };
    resetAll: () => void;
}

const useRequestTabStore = create<RequestTabState>()(
    devtools(
        persist(
            (set, get) => ({
                requestTabs: [],
                inputData: [],
                activeTab: 0,
                setActiveTab: (newActiveTab: number) => set({ activeTab: newActiveTab }),
                addRequest: (title: string) => {
                    set((prevState) => ({
                        requestTabs: [...prevState.requestTabs, { id: prevState.requestTabs.length, title }],
                        inputData: [
                            ...prevState.inputData,
                            { ...DEFAULT_REQUEST_INPUT, id: prevState.requestTabs.length },
                        ],
                    }));
                },
                updateRequestTitle: (newRequest: RequestTab) => {
                    set((prevState) => ({
                        requestTabs: prevState.requestTabs.map((req) =>
                            req.id === newRequest.id ? { ...req, title: newRequest.title } : req
                        ),
                    }));
                },
                updateInputData: (newInputData: RequestInputData) => {
                    set((prevState) => ({
                        inputData: prevState.inputData.map((data, index) =>
                            index === get().requestTabs[get().activeTab].id ? newInputData : data
                        ),
                    }));
                },

                deleteRequest: (id: number) => {
                    set((prevState) => ({
                        requestTabs: prevState.requestTabs
                            .filter((req) => req.id !== id)
                            .map((data) => (data.id < id ? data : { ...data, id: data.id - 1 })),
                        inputData: prevState.inputData.filter((_, index) => index !== id),
                    }));
                },
                reorderRequest: (startIndex: number, endIndex: number) => {
                    set((prevState) => {
                        const requestTabsCopy = [...prevState.requestTabs];
                        const [dragItem] = requestTabsCopy.splice(startIndex, 1);
                        requestTabsCopy.splice(endIndex, 0, dragItem);

                        return { requestTabs: requestTabsCopy };
                    });
                },

                getActiveTabInfo: () =>
                    // get().inputData.filter((data) => data.id === get().requestTabs[get().activeTab].id),
                    get().inputData[get().requestTabs[get().activeTab].id],

                getStateVariables: () => {
                    return {
                        title: get().requestTabs,
                        info: get().inputData,
                    };
                },
                resetAll: () => {
                    set({
                        requestTabs: [],
                        inputData: [],
                        activeTab: 0,
                    });
                },
            }),
            {
                name: "requestStore",
            }
        )
    )
);

export default useRequestTabStore;
