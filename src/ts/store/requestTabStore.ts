import { create } from "zustand";
import { RequestTab } from "../types/requestTab";
import { DEFAULT_REQUEST_INPUT, RequestInputData } from "../types/requestInput";
import { persist } from "zustand/middleware";

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
    getActiveTabInfo: () => RequestInputData[];
}

const useRequestTabStore = create<RequestTabState>()((set, get) => ({
    requestTabs: [],
    inputData: [],
    activeTab: 0,
    setActiveTab: (newActiveTab: number) => set({ activeTab: newActiveTab }),
    addRequest: (title: string) => {
        set((prevState) => ({
            requestTabs: [...prevState.requestTabs, { id: prevState.requestTabs.length, title }],
            inputData: [...prevState.inputData, { ...DEFAULT_REQUEST_INPUT, id: prevState.requestTabs.length }],
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
        console.log(get().inputData);
        set((prevState) => ({
            inputData: prevState.inputData.map((data) =>
                data.id === get().requestTabs[get().activeTab].id ? { ...newInputData, id: data.id } : data
            ),
        }));
    },

    deleteRequest: (id: number) => {
        set((prevState) => ({
            requestTabs: prevState.requestTabs.filter((req) => req.id !== id),
            inputData: prevState.inputData.filter((data) => data.id !== id),
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

    getActiveTabInfo: () => get().inputData.filter((data) => data.id === get().requestTabs[get().activeTab].id),
}));

export default useRequestTabStore;
