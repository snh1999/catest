import React, { useEffect, useState } from "react";
import { Checkbox, IconButton, List, ListItem, TextField } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import { DEFAULT_KEY_VALUE, KeyValue } from "../../../../ts/types/keyvalue";

type RowProp = {
    index: number;
    rows: KeyValue[];
    setRow: (rows: KeyValue[]) => void;
};

function NewKeyValueRow(props: RowProp) {
    const { index, rows, setRow } = props;

    const [checked, setChecked] = useState(true);
    const [key, setKey] = useState("");

    const [value, setValue] = useState("");

    function toggleChecked() {
        setChecked(!checked);
    }

    function removeRow(deleteKey: number) {
        setRow(
            rows.length == 1
                ? [{ isChecked: rows[0].isChecked, key: "", value: "" }]
                : rows.filter((_, index) => index !== deleteKey)
        );
    }

    function updateRow(updateKey: number, isKey: boolean, updatedValue: string) {
        const updatedRow = [...rows]; // Create a new array
        if (isKey) updatedRow[updateKey] = { ...updatedRow[updateKey], key: updatedValue };
        else updatedRow[updateKey] = { ...updatedRow[updateKey], value: updatedValue };
        setRow(updatedRow);
    }

    useEffect(() => {
        setChecked(rows[index].isChecked);
        setKey(rows[index].key);
        setValue(rows[index].value);
    }, [rows]);

    return (
        <ListItem key={index} disablePadding sx={{ paddingBottom: "10px" }}>
            <Checkbox edge="end" onChange={(_) => toggleChecked()} checked={checked} />
            <TextField
                value={key}
                placeholder="Key"
                onChange={(event) => setKey(event.target.value)}
                onBlur={() => updateRow(index, true, key)}
                sx={{ width: "50%", paddingRight: "10px", paddingLeft: "10px" }}
                size="small"
            />

            <TextField
                value={value}
                placeholder="Value"
                onChange={(event) => setValue(event.target.value)}
                onBlur={() => updateRow(index, false, value)}
                sx={{ width: "50%" }}
                size="small"
            />
            <IconButton onClick={() => removeRow(index)}>
                <DeleteIcon color="warning" />
            </IconButton>
        </ListItem>
    );
}

type InputProps = {
    rows: KeyValue[];
    setRow: (rows: KeyValue[]) => void;
};

function KeyValueInput(props: InputProps) {
    const { rows, setRow } = props;

    function addNewRow() {
        setRow([...rows, DEFAULT_KEY_VALUE]);
    }

    // function cleanUp() {
    //     setRow((prevState) => prevState.filter((value) => value.key !== ""));
    // }

    return (
        <React.Fragment>
            <List sx={{ width: "100%", bgcolor: "background.paper", padding: "0px", textAlign: "center" }}>
                {rows.map((_, index) => (
                    <NewKeyValueRow key={index} index={index} rows={rows} setRow={setRow} />
                ))}

                <IconButton sx={{ textAlign: "center" }} onClick={addNewRow}>
                    <AddBoxIcon />
                </IconButton>
            </List>
        </React.Fragment>
    );
}

export default KeyValueInput;
