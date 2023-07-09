import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
function RequestForm() {
    let age;
    return (
        <Box>
            <FormControl fullWidth>
                <Select
                    value={age}
                    label="GET"
                    // onChange={handleChange}
                >
                    <MenuItem value={'GET'}>GET</MenuItem>
                    <MenuItem value={'POST'}>POST</MenuItem>
                    <MenuItem value={'PATCH'}>PATCH</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

export default RequestForm;
