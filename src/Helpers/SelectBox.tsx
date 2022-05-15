import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface SelectBoxProps {
  label: string;
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  data: string[];
}

const SelectBox: React.FC<SelectBoxProps> = ({
  label,
  onChange,
  value,
  data,
}) => {
  return (
    <Box className="w-full">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select value={value} label={label} onChange={onChange}>
          {data.map((item, index) => {
            return (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectBox;
