import { Box, Checkbox, IconButton, List, ListItem, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import { DEFAULT_INPUT_FORM, InputFormType, InputType, inputTypeArray } from "../../../../ts/types/FormInput";

type RowProp = {
    index: number;
    rows: InputFormType[];
    setRow: React.Dispatch<React.SetStateAction<InputFormType[]>>;
};

function NewKeyValueRow(props: RowProp) {
    const { index, rows, setRow } = props;

    const [fieldName, setFieldName] = useState(DEFAULT_INPUT_FORM.fieldName);
    const [isUnique, setIsUnique] = useState(DEFAULT_INPUT_FORM.isUnique);
    const [isRequired, setIsRequired] = useState(DEFAULT_INPUT_FORM.isRequired);
    const [inputType, setInputType] = useState(DEFAULT_INPUT_FORM.inputType);

    function removeRow(deleteKey: number) {
        setRow(rows.length == 1 ? [DEFAULT_INPUT_FORM] : rows.filter((_, index) => index !== deleteKey));
    }

    function updateRow() {
        setRow((prevState) =>
            prevState.map((value, idx) => (idx !== index ? value : { fieldName, isUnique, isRequired, inputType }))
        );
    }

    useEffect(() => {
        setFieldName(rows[index].fieldName);
        setIsUnique(rows[index].isUnique);
        setIsRequired(rows[index].isRequired);
        setInputType(rows[index].inputType);
    }, [rows]);

    return (
        <ListItem key={index} disablePadding sx={{ paddingBottom: "10px", width: "100%" }}>
            <TextField
                value={fieldName}
                placeholder="Key"
                onChange={(event) => setFieldName(event.target.value)}
                onBlur={() => updateRow()}
                sx={{ width: "50%", paddingRight: "10px", paddingLeft: "10px" }}
                size="small"
            />
            <Select
                value={inputType}
                onChange={(event) => setInputType(event.target.value as InputType)}
                size="small"
                sx={{ marginRight: "5px", fontSize: ".9rem", width: "25%" }}
                autoWidth
                required
            >
                {inputTypeArray.map((item, index) => (
                    <MenuItem key={index} value={item}>
                        {item}
                    </MenuItem>
                ))}
            </Select>
            <Checkbox sx={{ width: "10%" }} edge="end" onChange={(_) => setIsUnique(!isUnique)} checked={isUnique} />
            <Checkbox
                sx={{ width: "10%" }}
                edge="end"
                onChange={(_) => setIsRequired(!isRequired)}
                checked={isRequired}
            />

            <IconButton onClick={() => removeRow(index)}>
                <DeleteIcon color="warning" />
            </IconButton>
        </ListItem>
    );
}

export default function FormInput() {
    const [rows, setRow] = useState([DEFAULT_INPUT_FORM]);

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
                    <Box component="span" sx={{ width: "50%", paddingRight: "10px", paddingLeft: "10px" }}>
                        FieldName
                    </Box>
                    <Box sx={{ width: "25%" }} component="span">
                        Type
                    </Box>
                    <Box sx={{ width: "7%" }} component="span">
                        Unique
                    </Box>
                    <Box sx={{ width: "10%" }} component="span">
                        Required
                    </Box>
                </ListItem>
                {rows.map((_, index) => (
                    <NewKeyValueRow key={index} index={index} rows={rows} setRow={setRow} />
                ))}

                <IconButton sx={{ textAlign: "center" }} onClick={addNewRow}>
                    <AddBoxIcon />
                </IconButton>
            </List>
        </>
    );
}
