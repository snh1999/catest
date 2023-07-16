import React from "react";
import RequestTab from "../../common/interfaces/RequestTab";
import TabPanel from "../../common/TabPanel";

type AllTabsProp = {
    requestArr: RequestTab[];
    activeTab: number;
};

export default function AllTabs(props: AllTabsProp) {
    const { requestArr: itemArr, activeTab } = props;
    return (
        <React.Fragment>
            {itemArr.map((item, index) => {
                return (
                    <TabPanel key={index} value={activeTab} index={index}>
                        {item.title}
                    </TabPanel>
                );
            })}
        </React.Fragment>
    );
}
