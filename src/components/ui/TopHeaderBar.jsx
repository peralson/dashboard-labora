import React from 'react';
import { Flex, Box } from '@chakra-ui/layout';

// SVG
import back from '../../assets/svg/back.svg';
import edit from '../../assets/svg/edit.svg';

// Components
import TopHeaderTitle from './TopHeaderTitle';
import TopButton from './TopButton';

const TopHeaderBar = ({ onGoBack, children, onEdit, ...rest }) => (
  <Flex alignItems={"center"} justifyContent={"space-between"}>
    {onGoBack && (
      <Flex>
        <TopButton left icon={back} onSelect={onGoBack}>
          Volver
        </TopButton>
      </Flex>
    )}
    <TopHeaderTitle {...rest}>{children}</TopHeaderTitle>
    {onEdit && (
      <Box>
        <TopButton right icon={edit} onSelect={onEdit}>
          Editar
        </TopButton>
      </Box>
    )}
  </Flex>
);

export default TopHeaderBar;
