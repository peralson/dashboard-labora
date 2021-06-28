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

const MultipleSelectList = ({
  title,
  values,
  current,
  onChange,
  ...rest
}) => (
  <Menu closeOnSelect={false}>
    <MenuButton
      border={"1px solid"}
      borderColor={"darkLight"}
      borderRadius={8}
      fontSize={14}
      as={Button}
      _hover={{ borderColor: "translucid" }}
      _active={{ borderColor: "translucid", bg: "darkLight" }}
      _focus={{ borderColor: "translucid" }}
      {...rest}
    >
      {title}
    </MenuButton>
    <MenuList
      bg={"darkLight"}
      borderColor={"translucid"}
      _hover={{ borderColor: "none" }}
      _focus={{ borderColor: "none" }}
    >
      {values.map((value, index) => (
        <MenuItem
          key={index}
          borderColor={"translucid"}
          _hover={{ borderColor: "translucid", bg: "translucid" }}
          _focus={{ borderColor: "translucid", bg: "translucid" }}
          _active={{ borderColor: "translucid", bg: "translucid" }}
        >
          <Flex>
            <Checkbox
              isChecked={current.includes(value)}
              name={value}
              onChange={onChange}
            />
            <Text ml={2} flex={1} fontSize={14}>
              {value}
            </Text>
          </Flex>
        </MenuItem>
      ))}
    </MenuList>
  </Menu>
);

export default MultipleSelectList;
