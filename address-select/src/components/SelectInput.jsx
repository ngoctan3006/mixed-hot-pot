import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import React from 'react';

const SelectInput = ({
  label,
  selected,
  data,
  onChange,
  disabled,
  error,
  required,
}) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl required={required} fullWidth error={!!error}>
        <InputLabel id={label}>{label}</InputLabel>
        <Select
          labelId={label}
          id={`select-${label}`}
          value={selected}
          label={label}
          onChange={onChange}
          disabled={disabled}
        >
          {data.map((item) => (
            <MenuItem key={item.code} value={item.code}>
              {`${item.type} ${item.name}`}
            </MenuItem>
          ))}
        </Select>
        {!!error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    </Box>
  );
};

export default SelectInput;
