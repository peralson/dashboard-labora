import React, { useState, useEffect } from 'react';
import { Flex, Text, Grid, Image } from '@chakra-ui/react';

// Redux & Actions
import { connect } from 'react-redux';
import { fetchTemplates } from '../../../store/actions/templates';

// SVG
import legal from '../../../assets/svg/legal.svg';
import plus from '../../../assets/svg/plus.svg';

const ContractTemplateCard = ({ data }) => (
  <Flex
    as={"a"}
    href={data.url}
    target={'_blank'}
    flexDirection={'column'}
    cursor={'pointer'}
    alignItems={'center'}
    minH={'180px'}
    justifyContent={'center'}
    borderRadius={10}
    borderWidth={2}
    _hover={{ borderColor: 'white' }}
    borderColor={false ? 'white' : 'darkLight'}
  >
    <Image src={legal} w={'32px'} mb={4} />
    <Text textAlign={'center'}>
      {data.name}
    </Text>
  </Flex>
);

const ContractTemplateNew = () => (
  <Flex
    flexDirection={'column'}
    cursor={'pointer'}
    alignItems={'center'}
    minH={'180px'}
    justifyContent={'center'}
    borderRadius={10}
    borderWidth={2}
    // _hover={{ borderColor: 'white' }}
    borderColor={'darkLight'}
    opacity={0.5}
  >
    <Image src={plus} w={'32px'} mb={4} />
    <Text textAlign={'center'}>
      Nueva plantilla
    </Text>
    <Text textAlign={'center'} fontSize={14}>
      Próximamente...
    </Text>
  </Flex>
);

const ManageTemplates = ({ search, templates, fetchTemplates }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      if (templates.length === 0) {
        setLoading(true);
      }
      setError(null);
      try {
        await fetchTemplates();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredTemplates = templates.filter((template) =>
    template.name.toLowerCase().includes(search),
  );

  return loading ? (
    <Text textAlign={'center'} py={10}>
      Cargando...
    </Text>
  ) : error ? (
    <Text textAlign={'center'} py={10}>
      Ha ocurrido un error
    </Text>
  ) : (
    <Grid w={'100%'} templateColumns={'1fr 1fr 1fr 1fr'} gap={4} mt={4}>
      {filteredTemplates.map((template, index) => (
        <ContractTemplateCard key={index} data={template} />
      ))}
      <ContractTemplateNew />
    </Grid>
  );
};

const mapDispatchToProps = {
  fetchTemplates,
};

const mapStateToProps = (state) => {
  return {
    templates: state.templates.templates,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageTemplates);
