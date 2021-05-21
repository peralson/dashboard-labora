import React from 'react';
import { Select } from '@chakra-ui/react';

const SelectList = (props) => (
  <Select
    placeholder={props.placeholder}
    onChange={props.onChange}
    borderRadius={8}
    borderWidth={1}
    borderColor="translucid"
    _hover={{ borderColor: "translucid" }}
    _focus={{ borderColor: "translucid" }}
    {...props}
  >
    {props.values.map((e) => (
      <option key={e} value={e}>
        {e}
      </option>
    ))}
  </Select>
);

export default SelectList;
