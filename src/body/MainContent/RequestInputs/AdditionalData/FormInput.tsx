import { Autocomplete, Box, Button, Checkbox, IconButton, List, ListItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { DEFAULT_INPUT_FORM, InputFormType, inputTypeArray } from "../../../../ts/types/FormInput";
import generateComboJson from "../../../../ts/helper/generateCombinations";
import FormRequest from "./FormRequest";

type RowProp = {
    index: number;
    rows: InputFormType[];
    setRow: (rows: InputFormType[]) => void;
};

function NewKeyValueRow(props: RowProp) {
    const { index, rows, setRow } = props;

    const [fieldName, setFieldName] = useState(rows[index].fieldName);
    const [isUnique, setIsUnique] = useState(rows[index].isUnique);
    const [isRequired, setIsRequired] = useState(rows[index].isRequired);
    const [inputType, setInputType] = useState(rows[index].inputType);

    function removeRow() {
        setRow(rows.length == 1 ? [DEFAULT_INPUT_FORM] : rows.filter((_, idx) => index !== idx));
    }

    function updateRow() {
        rows[index] = { fieldName, isUnique, isRequired, inputType };
        setRow([...rows]);
    }

    useEffect(() => {
        setFieldName(rows[index].fieldName);
        setIsUnique(rows[index].isUnique);
        setIsRequired(rows[index].isRequired);
        setInputType(rows[index].inputType);
    }, [rows]);

    useEffect(() => {
        updateRow();
    }, [isUnique, isRequired, inputType]);

    return (
        <ListItem key={index} disablePadding sx={{ paddingBottom: "10px", width: "100%" }}>
            <TextField
                value={fieldName}
                placeholder="Key"
                onChange={(event) => {
                    setFieldName(event.target.value);
                }}
                onBlur={() => updateRow()}
                sx={{ width: "40%" }}
                size="small"
            />

            <Autocomplete
                value={inputType}
                options={inputTypeArray}
                sx={{ width: "40%" }}
                onChange={(_, newValue) => {
                    if (newValue) setInputType(newValue);
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        // value={key}
                        placeholder="Field Type"
                        sx={{ width: "100%", paddingRight: "10px", paddingLeft: "10px" }}
                        size="small"
                    />
                )}
            />
            <Checkbox
                sx={{ width: "10%", paddingLeft: "2%" }}
                edge="end"
                onChange={(_) => setIsUnique(!isUnique)}
                checked={isUnique}
            />
            <Checkbox
                sx={{ width: "10%", paddingLeft: "5%" }}
                edge="end"
                onChange={(_) => setIsRequired(!isRequired)}
                checked={isRequired}
            />
            <IconButton sx={{ paddingLeft: "5%" }} onClick={() => removeRow()}>
                <DeleteIcon color="error" />
            </IconButton>
        </ListItem>
    );
}

type InputProps = {
    rows: InputFormType[];
    setRow: (rows: InputFormType[]) => void;
};

export default function FormInput(props: InputProps) {
    const { rows, setRow } = props;
    const [open, setOpen] = useState(false);
    const [requestBodies, setRequestBodies] = useState<Record<any, any>[]>([]);

    function addNewRow() {
        setRow([...rows, DEFAULT_INPUT_FORM]);
    }

    // function cleanUp() {
    //     setRow((prevState) => prevState.filter((value) => value.key !== ""));
    // }

    return (
        <>
            <List sx={{ width: "100%", bgcolor: "background.paper", padding: "0px", textAlign: "center" }}>
                <ListItem key="-1" disablePadding sx={{ paddingBottom: "10px" }}>
                    <Box component="span" sx={{ width: "40%", paddingRight: "10px", paddingLeft: "10px" }}>
                        FieldName
                    </Box>
                    <Box sx={{ width: "33%" }} component="span">
                        Type
                    </Box>
                    <Box sx={{ width: "10%" }} component="span">
                        Unique
                    </Box>
                    <Box sx={{ width: "1%" }} component="span">
                        Required
                    </Box>
                </ListItem>
                {rows.map((_, index) => (
                    <NewKeyValueRow key={index} index={index} {...props} />
                ))}

                <Button
                    sx={{ textAlign: "center", margin: "5px" }}
                    color="inherit"
                    variant="outlined"
                    onClick={addNewRow}
                    startIcon={<AddBoxIcon />}
                >
                    Add
                </Button>

                <Button
                    sx={{ textAlign: "center", margin: "5px" }}
                    color="inherit"
                    variant="outlined"
                    onClick={() => {
                        setRequestBodies(generateComboJson(rows));
                        setOpen(true);
                    }}
                    startIcon={<PostAddIcon />}
                >
                    Generate Requests
                </Button>
            </List>
            <FormRequest open={open} setOpen={setOpen} reqBodies={requestBodies} />
        </>
    );
}
