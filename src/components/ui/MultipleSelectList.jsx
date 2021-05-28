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

const MultipleSelectList = (props) => (
    <Menu closeOnSelect={false} > 
      <MenuButton
        ml={props.ml}
        {...props}
        border={'1px solid'}
        bg={"transparent"}
        borderColor={'darkLight'}
        fontSize={14}
        as={Button}
        _hover={{ borderColor: 'translucid' }}
        _active={{ borderColor: 'translucid', bg: "darkLight" }}
        _focus={{ borderColor: 'translucid', bg: "transparent" }}
      >
        {props.title}
      </MenuButton>
      <MenuList
        bg={'darkLight'}
        borderColor={'translucid'}
        _hover={{ borderColor: 'none' }}
        _focus={{ borderColor: 'none' }}
      >
        {props.values.map(value => (
          <MenuItem
            key={value}
            borderColor={'translucid'}
            _hover={{ borderColor: 'translucid', bg:"translucid" }}
            _focus={{ borderColor: 'translucid', bg:"translucid" }}
            _active={{ borderColor: 'translucid', bg:"translucid" }}
          >
            <Flex>
              <Checkbox
                isChecked={props.current.includes(value)}
                name={value}
                onChange={props.onChange}
              />
              <Text ml={2} flex={1} fontSize={14}>{value}</Text>
            </Flex>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );

export default MultipleSelectList;
