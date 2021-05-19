import React from 'react';
import { Select } from '@chakra-ui/react';

const SelectList = ({ placeholder, values, onChange }) => {

  return (
    <Select
      placeholder={placeholder}
      onChange={onChange}
      style={inputStyle}
    >
      {values.map((e) => {
        return (
          <option key={e}style={textStyle} value={e}>
            {e}
          </option>
        );
      })}
    </Select>
  );
};

const inputStyle = {
  background: 'transparent',
  outline: 'none',
  border: 'none',
};

const textStyle = {
  outline: 'none',
  border: 'none',
  color: 'black',
};

export default SelectList;
