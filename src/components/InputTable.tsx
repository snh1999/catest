import { useState } from "react";
import {
    Box,
    Checkbox,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";

const colums = ["", "key", "value", ""];

type RowProp = {
    index: number;
    setRow: React.Dispatch<React.SetStateAction<keyValue[]>>;
};

function NewKeyValueRow(props: RowProp) {
    const { index, setRow } = props;

    function removeRow(deleteKey: number) {
        setRow((prevState) => {
            console.log(prevState);
            if (prevState.length == 1) return prevState;
            return prevState.filter((_, index) => index !== deleteKey);
        });
    }

    function updateRow(updateKey: number, isKey: boolean, updatedValue: string) {
        setRow((prevState) => {
            console.log(prevState);

            const updatedRow = [...prevState]; // Create a new array
            if (isKey) updatedRow[updateKey] = { ...updatedRow[updateKey], key: updatedValue };
            else updatedRow[updateKey] = { ...updatedRow[updateKey], value: updatedValue };
            return updatedRow;
        });
    }

    return (
        <TableRow>
            {/* <TableCell component="th" scope="row">
            {row.name}
        </TableCell> */}
            <TableCell key={index + "0"} align="center" sx={{ padding: "10px" }}>
                <Checkbox sx={{ padding: "3px" }} />
            </TableCell>
            <TableCell key={index + "1"} align="right" sx={{ padding: "10px" }}>
                {index}
                <TextField
                    value={key}
                    onChange={(event) => {
                        setKey(event.target.value);
                        updateRow(index, true, event.target.value);
                    }}
                    size="small"
                    sx={{ width: "100%" }}
                />
            </TableCell>
            <TableCell key={index + "2"} align="right" sx={{ padding: "10px" }}>
                <TextField
                    value={value}
                    onChange={(event) => {
                        setValue(event.target.value);
                        updateRow(index, false, event.target.value);
                    }}
                    size="small"
                    sx={{ width: "100%" }}
                />
            </TableCell>
            <TableCell key={index + "3"} align="center" sx={{ padding: "10px" }}>
                <IconButton
                    onClick={() => {
                        removeRow(index);
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
}

type InputProps = {
    title: string;
    data: Map<string, string>;
    setData: (value: Map<string, string>) => void;
};

type keyValue = {
    // id: number;
    key: string;
    value: string;
    isChecked: boolean;
};

function InputTable(props: InputProps) {
    const { title } = props;
    const [data, setData] = useState([]);

    const [row, setRow] = useState<keyValue[]>([]);

    function addNewRow() {
        setRow((prevState) => [...prevState, { key: "", value: "", isChecked: true }]);
    }

    function addKey() {}

    function updateKey() {}

    return (
        <Box>
            <Typography sx={{ textAlign: "left", height: 0 }}>{title}</Typography>
            <Table sx={{ minWidth: "100%", borderWidth: "3px" }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {colums.map((columnName, index) => (
                            <TableCell align="right" key={index} sx={{ padding: "10px 15px", fontSize: "1rem" }}>
                                {columnName}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {row.map((_, index) => (
                        <NewKeyValueRow key={index.toString()} index={index} setRow={setRow} />
                    ))}
                </TableBody>
            </Table>
            <IconButton onClick={addNewRow}>
                <AddBoxIcon />
            </IconButton>
        </Box>
    );
}

export default InputTable;
