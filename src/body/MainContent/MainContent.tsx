import useRequestTabStore from "../../ts/store/requestTabStore";
import TabPanel from "../../common/TabPanel";
import RequestResponseBody from "./RequestResponse";

export default function MainContent() {
    const requestTabs = useRequestTabStore((store) => store.requestTabs);
    const activeTab = useRequestTabStore((store) => store.activeTab);

    return (
        <>
            {requestTabs.map((_, index) => {
                return (
                    <TabPanel key={index} value={activeTab} index={index}>
                        <RequestResponseBody />
                    </TabPanel>
                );
            })}
        </>
    );
}
