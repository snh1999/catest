import React, { useEffect, useState } from "react";
import { Autocomplete, Checkbox, IconButton, List, ListItem, TextField } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import { DEFAULT_KEY_VALUE, KeyValue } from "../../../../ts/types/keyvalue";
import HeaderTypes from "../../../../ts/types/headerTypes";

type RowProp = {
    index: number;
    rows: KeyValue[];
    setRow: (rows: KeyValue[]) => void;
    isHeader: boolean;
};

function NewKeyValueRow(props: RowProp) {
    const { index, rows, setRow, isHeader } = props;

    const [isChecked, setChecked] = useState(rows[index].isChecked);
    const [key, setKey] = useState(rows[index].key);

    const [value, setValue] = useState(rows[index].value);

    function toggleChecked() {
        setChecked(!isChecked);
    }

    function removeRow(deleteKey: number) {
        setRow(
            rows.length == 1
                ? [{ isChecked: rows[0].isChecked, key: "", value: "" }]
                : rows.filter((_, index) => index !== deleteKey)
        );
    }

    function updateRow() {
        rows[index] = { isChecked, key, value };
        setRow([...rows]);
    }

    useEffect(() => {
        setChecked(rows[index].isChecked);
        setKey(rows[index].key);
        setValue(rows[index].value);
    }, [rows]);

    useEffect(() => {
        updateRow();
    }, [key, isChecked]);

    return (
        <ListItem key={index} disablePadding sx={{ paddingBottom: "10px" }}>
            <Checkbox value={isChecked} edge="end" onChange={(_) => toggleChecked()} checked={isChecked} />
            {!isHeader && (
                <TextField
                    value={key}
                    placeholder="Key"
                    onChange={(event) => setKey(event.target.value)}
                    // onBlur={() => updateRow()}
                    sx={{ width: "50%", paddingRight: "10px", paddingLeft: "10px" }}
                    size="small"
                />
            )}
            {isHeader && (
                <Autocomplete
                    value={key}
                    options={HeaderTypes}
                    sx={{ width: "50%" }}
                    onChange={(_, newValue) => {
                        if (typeof newValue === "string") setKey(newValue);
                        else if (newValue) setKey(newValue.label);
                    }}
                    groupBy={(options) => options.type}
                    freeSolo
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            // value={key}
                            placeholder="Header Type"
                            // onBlur={() => updateRow()}
                            sx={{ width: "100%", paddingRight: "10px", paddingLeft: "10px" }}
                            size="small"
                        />
                    )}
                />
            )}

            <TextField
                value={value}
                placeholder="Value"
                onChange={(event) => setValue(event.target.value)}
                onBlur={() => updateRow()}
                sx={{ width: "50%" }}
                size="small"
            />
            <IconButton onClick={() => removeRow(index)}>
                <DeleteIcon color="error" />
            </IconButton>
        </ListItem>
    );
}

type InputProps = {
    rows: KeyValue[];
    setRow: (rows: KeyValue[]) => void;
    isHeader: boolean;
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
                    <NewKeyValueRow key={index} index={index} {...props} />
                ))}

                <IconButton sx={{ textAlign: "center" }} onClick={addNewRow}>
                    <AddBoxIcon />
                </IconButton>
            </List>
        </React.Fragment>
    );
}

export default KeyValueInput;
