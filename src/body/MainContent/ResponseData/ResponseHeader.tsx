import { Table, TableCell, TableContainer, TableRow } from "@mui/material";

export default function HeaderTab({ responseHeader }: { responseHeader: Record<string, string> }) {
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
