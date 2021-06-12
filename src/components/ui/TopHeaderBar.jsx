import React from 'react';
import { Flex, Box } from '@chakra-ui/layout';

// SVG
import back from '../../assets/svg/back.svg';
import edit from '../../assets/svg/edit.svg';

// Components
import TopHeaderTitle from './TopHeaderTitle';
import TopButton from './TopButton';

const TopHeaderBar = ({ onGoBack, children, onEdit }) => (
  <Flex alignItems={'center'} justifyContent={'space-evenly'}>
    <Box maxW={'100%'}>
      <TopButton left icon={back} onSelect={onGoBack}>
        Volver
      </TopButton>
    </Box>
    <TopHeaderTitle>{children}</TopHeaderTitle>
    {onEdit && (
      <Box maxW={'100%'}>
        <TopButton rigth icon={edit} onSelect={onEdit}>
          Editar
        </TopButton>
      </Box>
    )}
  </Flex>
);

export default TopHeaderBar;
