import React from 'react';
import {
  Checkbox,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Text,
  Flex,
} from '@chakra-ui/react';

const MultipleSelectList = (props) => {
  return (
    <Popover isLazy >
      <PopoverTrigger >
        <Button
        ml={props.ml} {...props}
          bg='darkLight'
          _hover={{ borderColor: 'translucid' }}
          _focus={{ borderColor: 'translucid' }}
        >
          {props.title}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        bg='darkLight'
        _hover={{ borderColor: 'translucid' }}
        _focus={{ borderColor: 'translucid' }}
      >
        <PopoverHeader fontWeight='semibold'>
          Selecciona {props.title}
        </PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          {props.values.map((e) => (
            <Flex key={e}>
              <Checkbox
                isChecked={props.current.includes(e)}
                name={e}
                onChange={props.onChange}
              />
              <Text ml='3'>{e}</Text>
            </Flex>
          ))}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default MultipleSelectList;
