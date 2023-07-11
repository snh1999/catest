import RequestTab from "./Request";

export type TabProps = {
    requestArr: RequestTab[];
    activeTab: number;
    handleChange: (newValue: number) => void;
};
