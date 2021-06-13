import React, { useState, useEffect } from 'react';
import { Flex, Box, Text } from '@chakra-ui/layout';

// Lib
import 'moment/locale/es';

// Redux & Actions
import { fetchWorkerContract } from '../../store/actions/contracts';
import { fetchWorkerPayroll } from '../../store/actions/payrolls';

// Components
import CustomImg from './CustomImg';
import FlexText from './FlexText';
import SideTitle from './SideTitle';
import Separator from './Separator';
import ErrorMessage from './ErrorMessage';

const JobSide = ({ data }) => {
  const [error, setError] = useState(null);
  const [contractLink, setContractLink] = useState();
  const [payrollLink, setPayrollLink] = useState();

  useEffect(() => {
    const getLinks = async () => {
      setContractLink(
        await fetchWorkerContract({ offerId: data.id, userId: data.worker.id })
      );
      setPayrollLink(
        await fetchWorkerPayroll({ offerId: data.id, userId: data.worker.id })
      );
    };
    getLinks();
  }, [data.id, data.worker.id]);

  return (
    <Box>
      {error && (
        <ErrorMessage
          title={`Ha ocurrido un error al ${error} la aplicatión`}
          onClose={() => setError(null)}
          noMargin
        />
      )}
      <Flex alignItems='center' mb={3} mt={error && 3}>
        <CustomImg
          image={data.worker.workerData.images.main}
          w={'64px'}
          h={'64px'}
          borderRadius={'50%'}
          borderWidth={2}
          borderColor={'darkLight'}
          backgroundSize={'contain'}
        />
        <Box flex={1} ml={4}>
          <Text fontSize={12} mb={1} color={'primary'}>
            {data.offerName.toUpperCase()}
          </Text>
          <Text fontSize={19} fontWeight={'bold'}>
            {data.worker.workerData.name}
          </Text>
        </Box>
      </Flex>
      {data.worker.tags.length !== 0 && (
        <Box mb={4}>
          <SideTitle mb={2}>Etiquetas</SideTitle>
          <Flex>
            {data.worker.tags.map((tag, index) => (
              <Text
                key={tag}
                fontSize={12}
                px={2}
                py={1}
                bg={'darkLight'}
                color={'primary'}
                ml={index !== 0 && 1}
                borderRadius={4}
              >
                #{tag}
              </Text>
            ))}
          </Flex>
        </Box>
      )}
      <Box mb={4}>
        <SideTitle mb={2}>Contacto</SideTitle>
        <FlexText
          left={'Teléfono'}
          right={data.worker.workerData.contact.phoneNumber}
        />
        <Separator top={1} bottom={1} />
        <FlexText left={'Email'} right={data.worker.workerData.contact.email} />
      </Box>
      {contractLink && (
        <Flex flexDirection='row'>
          <a href={contractLink} target='_blank' rel='noopener noreferrer'>
            <Flex
              w='100%'
              borderRadius={8}
              _hover={{ cursor: 'pointer' }}
              border={'1px solid'}
              borderColor={'translucid'}
              bg={'darkLight'}
              mr={4}
              justifyContent={'center'}
              alignItems={'center'}
              px={4}
              py={2}
            >
              Ver Contrato
            </Flex>
          </a>
        </Flex>
      )}
      {payrollLink && (
        <Flex flexDirection='row'>
          <a href={payrollLink} target='_blank' rel='noopener noreferrer'>
            <Flex
              w='100%'
              borderRadius={8}
              _hover={{ cursor: 'pointer' }}
              border={'1px solid'}
              borderColor={'translucid'}
              bg={'darkLight'}
              mr={4}
              justifyContent={'center'}
              alignItems={'center'}
              px={4}
              py={2}
            >
              Ver Nómina
            </Flex>
          </a>
        </Flex>
      )}
    </Box>
  );
};

export default JobSide;
