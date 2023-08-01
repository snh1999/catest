import { Alert, BottomNavigation, BottomNavigationAction, Button, Snackbar } from "@mui/material";
import AddRequest from "./AddRequest";
import TabsList from "./tabsView/TabsList";
import SaveIcon from "@mui/icons-material/Save";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { drawerWidth } from "../MainBody";
import { useState } from "react";
import useActiveRequestStore from "../../ts/store/activeRequestStore";
import useRequestTabStore from "../../ts/store/requestTabStore";
import generateDocumentationFromRequest from "../../ts/helper/documentationGenerator";

function SideBar() {
    const inputData = useRequestTabStore((store) => store.inputData);
    console.log(inputData);
    return (
        <>
            <AddRequest />
            <TabsList />
            <BottomButtons />
        </>
    );
}

function BottomButtons() {
    const [open, setOpen] = useState(false);
    const getState = useActiveRequestStore((store) => store.getState);
    const updateInputData = useRequestTabStore((store) => store.updateInputData);
    const getStateVariables = useRequestTabStore((store) => store.getStateVariables);

    function generateDocumentation() {
        const { title: requestTabs, info } = getStateVariables();
        let documentationString = "";

        requestTabs.forEach((requestTab) => {
            const requestInfo = info[requestTab.id];
            documentationString = documentationString + generateDocumentationFromRequest(requestTab.title, requestInfo);
        });
        console.log(documentationString);
    }

    return (
        <>
            <BottomNavigation showLabels sx={{ position: "fixed", bottom: 0, width: `${drawerWidth}px` }}>
                <BottomNavigationAction
                    onClick={() => updateInputData(getState())}
                    label="Save"
                    icon={<SaveIcon color="success" />}
                />
                <BottomNavigationAction
                    onClick={() => generateDocumentation()}
                    label="Export(MD)"
                    icon={<FileDownloadIcon color="success" />}
                />
                <BottomNavigationAction
                    onClick={() => setOpen(true)}
                    label="clear"
                    icon={<CleaningServicesIcon color="error" />}
                />
            </BottomNavigation>

            <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                <Alert severity="error" onClose={() => setOpen(false)}>
                    This Operation will Clear All Requests
                    <Button color="error" size="small" onClick={() => {}}>
                        Ok
                    </Button>
                </Alert>
            </Snackbar>
        </>
    );
}

export default SideBar;
