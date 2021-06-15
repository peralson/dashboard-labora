import React, { useState, useEffect } from 'react';
import { Flex, Text, Grid, Image } from '@chakra-ui/react';

// Redux & Actions
import { connect } from 'react-redux';
import { fetchTemplates } from '../../../store/actions/templates';

// SVG
import legal from '../../../assets/svg/legal.svg';
import plus from '../../../assets/svg/plus.svg';

const ContractTemplateCard = ({ data, nuevo }) => (
  <a
    href={
      !nuevo &&
      data.url
    }
    target='_blank'
    rel='noopener noreferrer'
  >
    <Flex
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
      <Image src={nuevo ? plus : legal} w={'32px'} mb={4} />
      <Text textAlign={'center'}>
        {nuevo ? 'Nueva plantilla' : data.name}
      </Text>
    </Flex>
  </a>
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

  const filteredTemplates = templates.filter(
    (template) =>
      template.category.toLowerCase().includes(search) ||
      template.type.toLowerCase().includes(search)
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
        <ContractTemplateCard key={template.id} data={template} />
      ))}
      <ContractTemplateCard nuevo />
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
