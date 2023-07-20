import { Badge, Box, Button, IconButton, Tab, Table, TableCell, TableContainer, TableRow, Tabs } from "@mui/material";
import { useCallback, useContext, useState } from "react";
import TabPanel from "../../../common/TabPanel";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import { ResponseContextType, ResponseDataContext } from "../../../common/context/ResponseContext";

export default function ResponseObject() {
    const [value, setValue] = useState(0);
    const { responseHeader, responseBody } = useContext(ResponseDataContext) as ResponseContextType;
    const response = JSON.stringify(responseBody, null, 2);

    return (
        <Box sx={{ width: "100%", paddingTop: "10px" }}>
            <Tabs value={value} onChange={(_, newValue) => setValue(newValue)}>
                <Tab sx={{ fontSize: "0.9rem", fontWeight: "bold" }} label="Response" id="0" />
                <Tab
                    sx={{ fontSize: "0.9rem", fontWeight: "bold" }}
                    label={
                        <Badge
                            // color="primary"
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            badgeContent={Object.keys(responseHeader).length}
                        >
                            Header
                        </Badge>
                    }
                    id="1"
                />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Box sx={{ textAlign: "left" }}>
                    <Badge
                        sx={{ width: "100%" }}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        badgeContent={
                            <IconButton onClick={() => navigator.clipboard.writeText(response)}>
                                <CopyAllIcon />
                            </IconButton>
                        }
                    >
                        <CodeMirror
                            value={response}
                            maxHeight="400px"
                            style={{ width: "100%" }}
                            extensions={[json()]}
                            theme="dark"
                            readOnly
                            autoFocus={false}
                            basicSetup={{
                                foldGutter: true,
                                dropCursor: false,
                                tabSize: 2,
                            }}
                        />
                    </Badge>
                </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <HeaderTab />
            </TabPanel>
        </Box>
    );
}

function HeaderTab() {
    const { responseHeader } = useContext(ResponseDataContext) as ResponseContextType;

    return (
        <TableContainer>
            <Table sx={{ width: "100%", padding: "0px" }}>
                {Object.entries(responseHeader).map(([key, value]) => (
                    <>
                        <TableRow key={key}>
                            <TableCell
                                style={{ width: "1px", whiteSpace: "nowrap", padding: "10px", fontSize: "1rem" }}
                            >
                                {key}
                            </TableCell>

                            <TableCell sx={{ padding: "5px", fontSize: "1rem" }}>{value}</TableCell>
                        </TableRow>
                    </>
                ))}
            </Table>
        </TableContainer>
    );
}
