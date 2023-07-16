import React, { useEffect, useState } from "react";
import { Checkbox, IconButton, List, ListItem, TextField, Typography } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import { DEFAULT_KEY_VALUE, KeyValue } from "../common/interfaces/KeyValue";

type RowProp = {
    index: number;
    rows: KeyValue[];
    setRow: React.Dispatch<React.SetStateAction<KeyValue[]>>;
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
        setRow((prevState) =>
            prevState.length == 1
                ? [{ isChecked: prevState[0].isChecked, key: "", value: "" }]
                : prevState.filter((_, index) => index !== deleteKey)
        );
    }

    function updateRow(updateKey: number, isKey: boolean, updatedValue: string) {
        setRow((prevState) => {
            const updatedRow = [...prevState]; // Create a new array
            if (isKey) updatedRow[updateKey] = { ...updatedRow[updateKey], key: updatedValue };
            else updatedRow[updateKey] = { ...updatedRow[updateKey], value: updatedValue };
            return updatedRow;
        });
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
                onChange={(event) => setKey(event.target.value)}
                onBlur={() => {
                    updateRow(index, true, key);
                }}
                sx={{
                    width: "50%",
                    paddingRight: "10px",
                    paddingLeft: "10px",
                }}
                size="small"
            />

            <TextField
                value={value}
                onChange={(event) => setValue(event.target.value)}
                onBlur={() => {
                    updateRow(index, false, value);
                }}
                sx={{ width: "50%" }}
                size="small"
            />
            <IconButton onClick={() => removeRow(index)}>
                <DeleteIcon />
            </IconButton>
        </ListItem>
    );
}

type InputProps = {
    title: string;
    rows: KeyValue[];
    setRow: React.Dispatch<React.SetStateAction<KeyValue[]>>;
};

function InputList(props: InputProps) {
    // const [rows, setRow] = useState<KeyValue[]>([DEFAULT_KEY_VALUE]);
    const { rows, setRow } = props;

    function addNewRow() {
        setRow((prevState) => [...prevState, DEFAULT_KEY_VALUE]);
    }
    function cleanUp() {
        setRow((prevState) => prevState.filter((value) => value.key !== ""));
    }

    return (
        <React.Fragment>
            <List sx={{ width: "100%", bgcolor: "background.paper", padding: "0px" }}>
                <ListItem>
                    <Typography sx={{ textAlign: "left" }}>{props.title}</Typography>
                </ListItem>
                <ListItem sx={{ padding: "0px" }}>
                    <Typography sx={{ width: "45%", textAlign: "right" }}>Key</Typography>
                    <Typography sx={{ width: "45%", textAlign: "right" }}>Value</Typography>
                </ListItem>
                {rows.map((value, index) => (
                    <NewKeyValueRow key={index} index={index} rows={rows} setRow={setRow} />
                ))}
            </List>
            <IconButton onClick={addNewRow}>
                <AddBoxIcon />
            </IconButton>
        </React.Fragment>
    );
}

export default InputList;
