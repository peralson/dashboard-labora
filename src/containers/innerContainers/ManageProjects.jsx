import React from 'react';
import { Flex } from '@chakra-ui/layout';
import PastProjectCard from '../../components/ui/PastProjectCard';

const ManageProjects = (props) => {
  const { data } = props;
  console.log('data',data)
  return (
    <Flex w='100%' flexDirection='column'>
      {data.map((e) => {
        return <PastProjectCard key={e.id} data={e} />;
      })}
    </Flex>
  );
};

export default ManageProjects;
