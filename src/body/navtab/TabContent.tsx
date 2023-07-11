import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React from "react";
import RequestTab from "../../common/interfaces/Request";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabContent(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
type TabPanelsProp = {
    requestArr: RequestTab[];
    activeTab: number;
};

export default function AllTabs(props: TabPanelsProp) {
    const { requestArr: itemArr, activeTab } = props;
    return (
        <React.Fragment>
            {itemArr.map((item, index) => {
                return (
                    <TabContent key={index} value={activeTab} index={index}>
                        {item.title}
                    </TabContent>
                );
            })}
        </React.Fragment>
    );
}
