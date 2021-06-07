import React, { useContext, useEffect, useState } from "react";
import { Grid, Text, Box, Flex, Image } from "@chakra-ui/react";

// Custom
import { NewProjectOfferContext } from "../../../../context/newCreations";

// SVG
import plus from '../../../../assets/svg/plus-white.svg'
import minus from '../../../../assets/svg/minus-white.svg'

// Components
import WorkerItem from '../../../../components/new/WorkerItem'
import MultipleSelectList from '../../../../components/ui/MultipleSelectList'

const QtyTags = () => {
  const { state, dispatch } = useContext(NewProjectOfferContext);

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [filteredWorkers, setFilteredWorkers] = useState([])
  const [tags, setTags] = useState([])
  const [filterTags, setFilterTags] = useState([])

  useEffect(() => {
    (() => {
      setError(null)
      setLoading(true)
      fetch(
        `https://us-central1-partime-60670.cloudfunctions.net/api/listOfWorkers/myWorkers/category/${state.category}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((data) => data.json())
        .then(workers => setFilteredWorkers(workers.body))
        .then(() => {
          filteredWorkers.forEach(worker => {
            if (worker.tags) {
              worker.tags.forEach(tag => {
                if (!tags.includes(tag)) {
                  setTags([...tags, tag])
                }
              })
            }
          })
        })
        .catch(e => setError(true))
        .finally(() => setLoading(false))
    })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(
    () => dispatch({ type: "setTotalWorker", payload: filteredWorkers.length }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ), [filteredWorkers])

  const qtyNotOne = state.qty !== 1

  const subtractQty = () => {
    if (qtyNotOne) {
      dispatch({ type: "subtractQty" })
    }
  }

  const addQty = () => {
    dispatch({ type: "addQty" })
  }

  const handleTags = (event) => {
    if (!filterTags.includes(event.target.name)) {
      setFilterTags([...filterTags, event.target.name]);
    } else {
      setFilterTags(filterTags.filter((e) => e !== event.target.name));
    }
  };

  return (
    <Grid w={"100%"} maxW={"600px"} mx={"auto"} rowGap={4} my={4}>
      <Box>
        <Text mb={1} fontWeight={"bold"} lineHeight={2}>
          Cantidad de trabajadores *
        </Text>
        <Text mb={4} color={"grey.dark"}> 
          Selecciona el número de personas que vas a necesitar trabajando en esta oferta.
        </Text>
        <Flex w={"100%"} alignItems={"stretch"} justifyContent={"space-between"} borderRadius={8} overflow={"hidden"} borderWidth={2} borderColor={"darkLight"}>
          <Flex alignItems={"center"} justifyContent={"center"} bg={"primary"} minW={"60px"} cursor={qtyNotOne && "pointer"} opacity={!qtyNotOne && 0.5} onClick={subtractQty}>
            <Image src={minus} alt={"reducir personal"} w={"12px"}/>
          </Flex>
          <Box flex={1}>
            <Text py={2} textAlign={"center"} fontWeight={"bold"} fontSize={16}>
              {state.qty}
            </Text>
          </Box>
          <Flex alignItems={"center"} justifyContent={"center"} bg={"primary"} minW={"60px"} cursor={"pointer"} onClick={addQty}>
            <Image src={plus} alt={"aumentar personal"} w={"12px"}/>
          </Flex>
        </Flex>
      </Box>
      <Box>
        <Text mb={1} fontWeight={"bold"} lineHeight={2}>
          Filtrado adicional por etiquetas
        </Text>
        <Text mb={2} color={"grey.dark"}>
          En caso de ser necesario, selecciona etiquetas que limiten a los {state.category} con acceso a esta oferta.
        </Text>
        {state.totalWorkers > 0 && (
          <Flex w={"100%"} mb={4} alignItems={"center"} justifyContent={"space-between"}>
            {tags.length === 0 ? <Box></Box> : (
              <MultipleSelectList
                title={`Etiquetas${
                  filterTags.length > 0 ? ` (${filterTags.length})` : ''
                }`}
                bg={filterTags.length !== 0 && 'darkLight'}
                current={filterTags}
                values={tags}
                onChange={handleTags}
              />
            )}
            <Text color={"primary"} fontSize={14}>Total trabajadores: {state.totalWorkers}</Text>
          </Flex>
        )}
        {loading
          ? <Text>Cargando {state.category}...</Text>
          : error
            ? <Text>Ha ocurrido un error</Text>
            : filteredWorkers.map((worker, index) => (
              <WorkerItem key={index} worker={worker} />
            ))
        }
      </Box>
    </Grid>
  );
};

export default QtyTags;
