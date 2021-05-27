import React from 'react';
import {
  Checkbox,
  Button,
  Text,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';

// Icon
import { MdKeyboardArrowDown } from 'react-icons/md';

const MultipleSelectList = (props) => {
  return (
    <Menu closeOnSelect={false} > 
      <MenuButton
        ml={props.ml}
        {...props}
        minWidth={35}
        bg={props.bg ?? 'darkLight'}
        _hover={{ borderColor: 'translucid' }}
        _focus={{ borderColor: 'translucid' }}
        as={Button}
        rightIcon={<MdKeyboardArrowDown />}
      >
        {props.title}
      </MenuButton>
      <MenuList
        bg='darkLight'
        _hover={{ borderColor: 'none' }}
        _focus={{ borderColor: 'none' }}
      >
        {props.values.map((e) => (
          <MenuItem _hover={{ borderColor: 'translucid' }}
          _focus={{ borderColor: 'translucid' }}>
            <Flex key={e}>
              <Checkbox
                isChecked={props.current.includes(e)}
                name={e}
                onChange={props.onChange}
              />
              <Text ml='3'>{e}</Text>
            </Flex>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default MultipleSelectList;
