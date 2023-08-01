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
import DocViewer from "../DocViewer/DocViewer";

function SideBar() {
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
    const [viewDoc, setViewDoc] = useState(false);
    const getState = useActiveRequestStore((store) => store.getState);
    const updateInputData = useRequestTabStore((store) => store.updateInputData);
    const getStateVariables = useRequestTabStore((store) => store.getStateVariables);
    const [documentation, setDocumentation] = useState("");

    function generateDocumentation() {
        const { title: requestTabs, info } = getStateVariables();
        let documentationString = "";

        requestTabs.forEach((requestTab) => {
            const requestInfo = info[requestTab.id];
            documentationString = documentationString + generateDocumentationFromRequest(requestTab.title, requestInfo);
        });
        setDocumentation(documentationString);
        setViewDoc(true);
    }

    return (
        <>
            <DocViewer open={viewDoc} setOpen={setViewDoc} documentation={documentation} />
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
